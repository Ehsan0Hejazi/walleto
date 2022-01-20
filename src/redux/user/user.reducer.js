const INITIAL_STATE = {
  profile : null,
  accounts : [],
  catShares: [
    {category: 'food', share: 100/6},
    {category: 'cloth', share: 100/6},
    {category: 'bills', share: 100/6},
    {category: 'gas', share: 100/6},
    {category: 'housing', share: 100/6},
    {category: 'other', share: 100/6}
  ],
  budgets: [
    {
      id: '8d7gw8',
      title: 'بچه ها',
      category: 'cloth',
      maxWithdraw: 1200000,
      available: 500000,
    },
    {
      id: 'd0wdww',
      title: 'بنز',
      category: 'gas',
      maxWithdraw: 600000,
      available: 200000,
    },
    {
      id: 'kdw8nd',
      title: 'رستوران',
      category: 'food',
      maxWithdraw: 1000000,
      available: 700000,
    },
  ],
  catExpenses: [],
  unCatExpenses: [],
  catIncomes: [],
  unCatIncomes: [],
  allTransactions: [],
  pie: null,
  period: 1000*3600*24,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.value
      }
    case 'SET_CAT_SHARES':
      return {
        ...state,
        catShares: action.value
      }
    case 'SET_ACCOUNTS':
      return {
        ...state,
        accounts: action.value
      }
    case 'SET_CAT_EXPENSES':
      return {
        ...state,
        catExpenses: action.value
      }
    case 'SET_UN_CAT_EXPENSES':
      return {
        ...state,
        unCatExpenses: action.value,
      }
    case 'SET_CAT_INCOME':
      return {
        ...state,
        catIncomes: action.value,
      }
    case 'SET_UN_CAT_INCOME':
      return {
        ...state,
        unCatIncomes: action.value
      }
    case 'SET_CAT_SHARES':
      return {
        ...state,
        catShares: action.value
      }
    case 'SET_BUDGET':
      return {
        ...state,
        budgets: action.value
      }
    case 'SET_ALL_TRANSACTIONS':
      return {
        ...state,
        allTransactions: action.value
      }
    case 'UPDATE_PIE': 
      return {
        ...state,
        pie: action.value
      }
    case 'SET_PERIOD':
      return {
        ...state,
        period: action.value
      }

    default:
      return state
  }
}

export default userReducer;