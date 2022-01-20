import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect}  from 'react-redux';

import { setAccounts } from '../../redux/user/user.action';
import useSMS from './hooks/useSMS';
import useDB from './hooks/useDB';
import justBankMessages from './hooks/justBankMessages';
import classifier from './hooks/classifier';
import sqlite from '../../utils/sqlite';

function Splash({ navigation, _setAccounts }) {
  const [ messages, setMessage ] = useState();
  const [ bankMessages, setBankMessages ] = useState();
  const [ classified, setClassified ] = useState();

  // useDB('SELECT * FROM test', result => {
  //   console.log(result);
  // });
  
  useSMS(msgs => setMessage(msgs));

  useEffect(() => {
    if (messages) {
      const bankMsgs = justBankMessages(messages);
      setBankMessages(bankMsgs);
    }
  }, [messages]);

  useEffect(() => {
    if (bankMessages) {
      setClassified(classifier(bankMessages));
    }
  }, [bankMessages]);

  useEffect(() => {
    if(classified) {
      functionInvokation();
    }
  }, [classified]);

  const functionInvokation = async () => {
    await setAccountsToSqlite();
    const accs = await setTransactionsToSqlite();
    _setAccounts(accs);
    setTimeout(() => {
      navigation.replace('Tabs');
    }, 1000);
  }

  const getAccountsFromSqlite = async () => {
    let accountsArray = [];
    const res = await sqlite('SELECT * FROM accounts');
    const len = res.rows.length;
    for(let i = 0; len > i; i++) {
      accountsArray.push(res.rows.item(i));
    }
    return accountsArray;
  }

  const setAccountsToSqlite = async () => {
    const accountsDB = await getAccountsFromSqlite();
    const accountsDBNames = accountsDB.map(element => {
      return element.BankName;
    });
    let baseQuery = 'INSERT INTO accounts (BankName, AccountNumber, Balance) VALUES';
    let countInputs = 0;
    classified.forEach((acc, index) => {
      if (!accountsDBNames.includes(acc.bankName)) {
        baseQuery = baseQuery.concat(` ("${acc.bankName}", "${acc.accountNumber}", ${acc.balance}),`);
        countInputs++;
      } 
    });

    if (countInputs > 0) {
      baseQuery = baseQuery.slice(0, -1);
      baseQuery = baseQuery.concat(';');
      await sqlite(baseQuery);
    }
  }
  

  const getTransactionsFromSqlite = async () => {
    let transactionsArray = [];
    const res = await sqlite('SELECT * FROM transactions');
    const len = res.rows.length;
    for(let i = 0; len > i; i++) {
      transactionsArray.push(res.rows.item(i));
    }
    return transactionsArray;
  }

  const setTransactionsToSqlite = async () => {
    const transactionsDB = await getTransactionsFromSqlite();
    const accountsDB = await getAccountsFromSqlite();
    let baseQuery = 'INSERT INTO transactions (BankName, DateTime, Type, Amount) VALUES';
    let handyQuery = 'INSERT INTO handy (BankName, DateTime, Type, Amount, Description, Category) VALUES';

    let countInputs = 0;

    accountsDB.forEach((acc, index) => {
      const bankObj = classified.filter(e => {
        return e.bankName === acc.BankName
      })[0];

      if (bankObj) {
        bankObj.transactions.forEach(async (transaction, i) => {
          const checked = transactionsDB.filter(txDB => {
            return (txDB.BankName === bankObj.bankName && txDB.DateTime === transaction.date)
          });
  
          if (checked.length === 0) {
            const tomanAmount = parseInt(transaction.amount.toString().slice(0 , -1));

            baseQuery = baseQuery.concat(` ("${bankObj.bankName}", ${transaction.date}, "${transaction.type}", ${transaction.amount}),`);
            handyQuery = handyQuery.concat(` ("${bankObj.bankName}", ${transaction.date}, "${transaction.type.toUpperCase()}", ${tomanAmount}, "تراکنش های پیامکی", "uncat"),`);
            countInputs++;
          }
        });
      }

    });

    if (countInputs > 0) {
      baseQuery = baseQuery.slice(0, -1);
      baseQuery = baseQuery.concat(';');

      handyQuery = handyQuery.slice(0, -1);
      handyQuery = handyQuery.concat(';');

      await Promise.all([ sqlite(baseQuery), sqlite(handyQuery)]);
    }

    return await getAccountsFromSqlite();
  }

  return (
    <View 
      style={styles.container}>
      <Text style={{fontWeight: 'bold', color: '#ffffff'}}>
        Wallet
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#13263a'
  }
})

// const mapStateToProps = state => ({
//   acc: state.user.accounts
// });

const mapDispatchToProps = dispatch => ({
  _setAccounts: (data) => dispatch(setAccounts(data))
})

export default connect(null, mapDispatchToProps)(Splash);