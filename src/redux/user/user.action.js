import sqlite from '../../utils/sqlite';
import cats from '../../assets/categories';
import dateConverter from '../../utils/dateConverter';

export const setUser = user => ({
  type: 'SET_USER',
  value: user
});

export const setAccounts = accounts => ({
  type: 'SET_ACCOUNTS',
  value: accounts
});

export const setCatExpenses = arr => ({
  type: 'SET_CAT_EXPENSES',
  value: arr
});

export const setUnCatExpenses = arr => ({
  type: 'SET_UN_CAT_EXPENSES',
  value: arr
});

export const setCatIncome = arr => ({
  type: 'SET_CAT_INCOME',
  value: arr
});

export const setUnCatIncome = arr => ({
  type: 'SET_UN_CAT_INCOME',
  value: arr
});

export const setCatShares = arr => ({
  type: 'SET_CAT_SHARES',
  value: arr
})

export const setBudgets = arr => ({
  type: 'SET_BUDGET',
  value: arr
});

export const setAllTransactions = arr => ({
  type: 'SET_ALL_TRANSACTIONS',
  value: arr
});

export const setPie = obj => ({
  type: 'UPDATE_PIE',
  value: obj
});

export const setPeriodGlob = (val) => {
  
  let stateNumber;

  if (val === 'DAY') {
    stateNumber = 1000*3600*24
  } else if (val === 'WEEK') {
    stateNumber = 1000*3600*24*7
  } else if (val === 'MONTH') {
    stateNumber = 1000*3600*24*30
  } else if (val=== 'SEASON') {
    stateNumber = 1000*3600*24*90
  }
  
  return {
    type: 'SET_PERIOD',
    value: stateNumber,
  }
}

export const getPieAsync = (n) => {
  return async dispatch => {
    const incomeQ = await sqlite(`SELECT SUM(amount) as sum FROM handy WHERE Type = 'INCOME' AND DateTime >= ${Date.now() - n} AND NOT Category='pocket'`);
    const costQ = await sqlite(`SELECT SUM(amount) as sum FROM handy WHERE Type = 'COST' AND DateTime >= ${Date.now() - n} AND NOT Category='pocket'`);

    const income = incomeQ.rows.item(0).sum;
    const cost = costQ.rows.item(0).sum;
    
    dispatch(setPie({ income, cost }))
  }
}

export const getAccountsAsync = () => {
  return async dispatch => {
    let accountsArray = [];
    const res = await sqlite('SELECT * FROM accounts');
    const len = res.rows.length;
    for (let i = 0; len > i; i++) {
      accountsArray.push(res.rows.item(i));
    }

    dispatch(setAccounts(accountsArray))
  }
}


export const getAllTransactionsAsync = () => {
  return async dispatch => {
    let arr = [];
    let res = await sqlite("SELECT * FROM handy ORDER BY DateTime DESC LIMIT 15");

    const len = res.rows.length;
    for (let i = 0; len > i; i++) {
      arr.push(res.rows.item(i));
    }
    dispatch(setAllTransactions(arr))
  }
}

export const getCategorizedExpensesAsync = filter => {
  return async dispatch => {
    let arr = [];
    let res;
    if (!filter) {
      res = await sqlite("SELECT * FROM handy WHERE Type='COST' AND NOT Category='uncat' ORDER BY DateTime DESC");
    } else {
      const category = filter.category ? `AND Category='${filter.category}'` : '';
      const date = filter.date ? `AND DateTime >= ${Date.now() - dateConverter(filter.date)} ` : '';
      const account = filter.account === 'all'? '' : `AND BankName = '${filter.account}'`;
      const from = filter.from ? `AND Amount >= ${parseInt(filter.from)}` : '';
      const to = filter.to ? `AND Amount <= ${parseInt(filter.to)}` : '';
      res = await sqlite(`SELECT * FROM handy WHERE Type='COST' ${category} ${account} ${date} ${from} ${to} AND NOT Category='uncat' ORDER BY DateTime DESC`)
    }
    const len = res.rows.length;
    for (let i = 0; len > i; i++) {
      arr.push(res.rows.item(i));
    }
    dispatch(setCatExpenses(arr))
  }
}

export const getUnCategorizedExpensesAsync = filter => {
  return async dispatch => {
    let arr = [];
    let res;
    if (!filter) {
      res = await sqlite("SELECT * FROM handy WHERE Type='COST' AND Category='uncat' ORDER BY DateTime DESC");
    } else {
      const date = filter.date ? `AND DateTime >= ${Date.now() - dateConverter(filter.date)} ` : '';
      const account = filter.account === 'all'? '' : `AND BankName = '${filter.account}'`;
      const from = filter.from ? `AND Amount >= ${parseInt(filter.from)}` : '';
      const to = filter.to ? `AND Amount <= ${parseInt(filter.to)}` : '';
      res = await sqlite(`SELECT * FROM handy WHERE Type='COST' ${account} ${date} ${from} ${to} AND Category='uncat' ORDER BY DateTime DESC`)
    }
    const len = res.rows.length;
    for (let i = 0; len > i; i++) {
      arr.push(res.rows.item(i));
    }
    dispatch(setUnCatExpenses(arr))
  }
}


export const getCategorizedIncomesAsync = filter => {
  return async dispatch => {
    let arr = [];
    let res;
    if (!filter) {
      res = await sqlite("SELECT * FROM handy WHERE Type='INCOME' AND NOT Category='uncat' ORDER BY DateTime DESC");
    } else {
      const category = filter.category ? `AND Category='${filter.category}'` : '';
      const date = filter.date ? `AND DateTime >= ${Date.now() - dateConverter(filter.date)} ` : '';
      const account = filter.account === 'all'? '' : `AND BankName = '${filter.account}'`;
      const from = filter.from ? `AND Amount >= ${parseInt(filter.from)}` : '';
      const to = filter.to ? `AND Amount <= ${parseInt(filter.to)}` : '';
      res = await sqlite(`SELECT * FROM handy WHERE Type='INCOME' ${category} ${account} ${date} ${from} ${to} AND NOT Category='uncat' ORDER BY DateTime DESC`)
    }
    const len = res.rows.length;
    for (let i = 0; len > i; i++) {
      arr.push(res.rows.item(i));
    }
    dispatch(setCatIncome(arr))
  }
}

export const getUnCategorizedIncomesAsync = filter => {
  return async dispatch => {
    let arr = [];
    let res;
    if (!filter) {
      res = await sqlite("SELECT * FROM handy WHERE Type='INCOME' AND Category='uncat' ORDER BY DateTime DESC");
    } else {
      const date = filter.date ? `AND DateTime >= ${Date.now() - dateConverter(filter.date)} ` : '';
      const account = filter.account === 'all'? '' : `AND BankName = '${filter.account}'`;
      const from = filter.from ? `AND Amount >= ${parseInt(filter.from)}` : '';
      const to = filter.to ? `AND Amount <= ${parseInt(filter.to)}` : '';
      res = await sqlite(`SELECT * FROM handy WHERE Type='INCOME' ${account} ${date} ${from} ${to} AND Category='uncat' ORDER BY DateTime DESC`)
    }
    const len = res.rows.length;
    for (let i = 0; len > i; i++) {
      arr.push(res.rows.item(i));
    }
    dispatch(setUnCatIncome(arr))
  }
}


export const getSharesAsync = () => {
  return async dispatch => {
    const {uncat, pocket, ...rest} = cats;
    const catKeys = Object.keys(rest);
    
    let arr = [];
    let sum = 0;
    catKeys.forEach(cat => {
      sqlite(`SELECT SUM(Amount) as count FROM handy WHERE Category ='${cat}' AND Type='COST';`)
        .then(res => {
          const count = res.rows.item(0).count;
          sum += count;
          
          arr.push({category: cat, share: count === null ? 0 : count});
        });
    });

    let arrToStore;

    setTimeout(() => {
      arrToStore = arr.map(e => {
        return {category: e.category, share: (e.share*100)/sum}
      });

      let letDispatch = false;

      arr.forEach(e => {
        if (e.share > 0) {
          letDispatch = true
        }
      })

      if (letDispatch) {
        dispatch(setCatShares(arrToStore));
      }
    }, 1000);
  }
}

export const getBudgetsAsync = () => {
  return async dispatch => {
    let arr = [];
    const res = await sqlite("SELECT * FROM budgets");
    const len = res.rows.length;
    for (let i = 0; len > i; i++) {
      arr.push(res.rows.item(i));
    }
    dispatch(setBudgets(arr))
  }
}