import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Text from '../components/Text';
import color from '../vars/color';
import tk, {types} from '../vars/types';
import sqlite from '../utils/sqlite';
import { hideRootView } from '../redux/controller/controller.action';
import {getCategorizedExpensesAsync, 
        getUnCategorizedExpensesAsync,
        getUnCategorizedIncomesAsync,
        getCategorizedIncomesAsync,
        getAccountsAsync,
        getSharesAsync,
        getBudgetsAsync,
        getAllTransactionsAsync,
        getPieAsync,
} from '../redux/user/user.action';
import DropDownMenu from './components/DropDownMenu';
import InputLabel from './components/InputLabel';
import CategorySelectorModal from './components/CategorySelectorModal';
import CategorySelectorButton from './components/CategorySelectorButton';
import BankOptionTile from './components/BankOptionTile';
import BottomSheet from './components/BottomSheet';
import banks, { getBank } from '../assets/bank/index';
import SegmentedControl from '@react-native-community/segmented-control';

function AddTransaction(props) {
  const [ visibleCategory, setVisibleCategory ] = useState(false);

  ///related to pocket
  const [ toAccount, setToACcount] = useState(props.accounts[0].BankName);
  const [ fromAccount, setFromAccount ] = useState(props.accounts[0].BankName);
  const [ pocketAmount, setPocketAmount ] = useState();
  const [ activeTab, setActiveTab ] = useState(1);


  const [ body, setBody ] = useState({
    type: props.rootView.initialValues.type,
    description: props.rootView.initialValues.description,
    category: props.rootView.initialValues.category || 'food',
    amount: props.rootView.initialValues.amount,
    account: props.rootView.initialValues.account || props.accounts[0].BankName,
  });

  const setType = val => {
    setBody({
      ...body,
      type: val,
    })
  }

  const setDescription = val => {
    setBody({
      ...body,
      description: val
    })
  }

  const setCategory = val => {
    setBody({
      ...body,
      category: val
    });

    setVisibleCategory(false)
  }

  const setAmount = val => {
    setBody({
      ...body,
      amount: val
    });
  }

  const setAccount = val => {
    setBody({
      ...body,
      account: val 
    })
  }

  const _fromAccount = val => {
    setFromAccount(val);
  }

  const _toAccount = val => {
    setToACcount(val);
  }

  const _pocketAmount = val => {
    setPocketAmount(val);
  }

  const _submitPocket = async () => {
    if ( pocketAmount && pocketAmount > 0 ) {
      if (toAccount === fromAccount) {
        ToastAndroid.show('حساب مبدا و مقصد باید متفاوت باشد', ToastAndroid.SHORT);
      } else {
        const costQuery = `INSERT INTO handy (BankName, Type, Description, Category, Amount, DateTime) VALUES
        ("${fromAccount}", "COST", "جیب به جیب به ${getBank(toAccount).label}", "pocket", "${pocketAmount}", "${Date.now()}");`;

        const incomeQuery = `INSERT INTO handy (BankName, Type, Description, Category, Amount, DateTime) VALUES
        ("${toAccount}", "INCOME", "جیب به جیب از ${getBank(fromAccount).label}", "pocket", "${pocketAmount}", "${Date.now()}");`;

        const getBalanceQuery = `SELECT Balance from accounts WHERE BankName = "${fromAccount}"`;
        const balanceOBj = await sqlite(getBalanceQuery);
        const balance = balanceOBj.rows.item(0).Balance;

        const incrementQuery = `UPDATE accounts SET Balance = Balance + ${pocketAmount} WHERE BankName ="${toAccount}"`;
        const decrementQuery = `UPDATE accounts SET Balance = Balance - ${pocketAmount} WHERE BankName ="${fromAccount}"`;
        
        if ( balance >= pocketAmount) {
          await Promise.all([
            sqlite(costQuery), 
            sqlite(incomeQuery),
            sqlite(incrementQuery),
            sqlite(decrementQuery),
          ])
          
          props.getCategorizedExpensesAsync();
          props.getUnCategorizedExpensesAsync();
          props.getCategorizedIncomesAsync();
          props.getUnCategorizedIncomesAsync();
          props.getAllTransactionsAsync();
          props.getSharesAsync();
          props.getBudgetsAsync();
          props.getPieAsync(props.period);
          props.hideRootView();
        } else {
          ToastAndroid.show('موجودی حساب مبدا کافی نمی باشد', ToastAndroid.SHORT);
        }
      }
    } else {
      ToastAndroid.show('مبلغ شما صحیح نمی باشد', ToastAndroid.SHORT);
    }
    
  }

  const submit = async () => {
    if (body.type === 'POCKET') {
      return _submitPocket();
    }
    
    const keys = Object.keys(body);
    let counter = 0;

    for (let i = 0; keys.length > i; i++) {
      const key = keys[i];
      if (body[key] === undefined || body[key] === "") {
        ToastAndroid.show('تمامی ورودی هارا پر کنید', ToastAndroid.SHORT);
        break;
      } else {
        counter++;
      }
    }
    
    if (keys.length === counter) {
      let query = `INSERT INTO handy (BankName, Type, Description, Category, Amount, DateTime) VALUES
      ("${body.account}", "${body.type}", "${body.description}", "${body.category}", "${body.amount}", "${Date.now()}");`;
      
      let incrementBudgetBalanceQuery = `UPDATE budgets SET Balance = Balance - ${body.amount} WHERE category = '${body.category}';`

      await sqlite(query);

      if (body.type === 'COST') {
        await sqlite(incrementBudgetBalanceQuery)
      }
      
      //invoke just the part has changed
      props.getCategorizedExpensesAsync();
      props.getUnCategorizedExpensesAsync();
      props.getCategorizedIncomesAsync();
      props.getUnCategorizedIncomesAsync();
      props.getAllTransactionsAsync();
      props.getSharesAsync();
      props.getBudgetsAsync();
      props.getPieAsync(props.period);
      props.hideRootView();
    }
  }

  return (
    <BottomSheet hideModal={() => setVisibleCategory(false)}>
      <View style={{flex:1}}>
        <ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>افزودن تراکنش</Text>
          </View>

          {/* <View style={{ flexDirection: 'row-reverse' }}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>نوع</Text>
              <DropDownMenu
                disabled
                options={tk}
                initialState={body.type}
                onChange={setType}
                type={{obj: types, arr: tk}}
              />
            </View>
            
            <View style={{flex: 1}}>
              <Text style={styles.label}> </Text>
              <View style={styles.pocketCheckBox}></View>
            </View>
          </View> */}

          <SegmentedControl
            style={{ marginTop: 10, height: 40 }}
            fontStyle={{ fontSize: 10 }}
            activeFontStyle={{ fontSize: 10 }}
            values={[ 'جیب به جیب', types[props.rootView.initialValues.type] ]}
            selectedIndex={activeTab}
            onChange={(event) => {
              const index = event.nativeEvent.selectedSegmentIndex;
              setActiveTab(index);
              setType(index === 1 ? props.rootView.initialValues.type : 'POCKET' );
            }}
          />
          
          {body.type !== 'POCKET' &&
            <>
              <InputLabel label="شرح" onChange={setDescription} defaultValue={body.description}/>

              <Text style={styles.label}>دسته بندی</Text>
              <CategorySelectorButton onPress={() => setVisibleCategory(true)} category={body.category} />

              <InputLabel label="مبلغ" onChange={setAmount} defaultValue={body.amount} numeric />

              <Text style={styles.label}>شماره حساب</Text>
              {props.accounts.map((bank, index) => <BankOptionTile bank={bank} key={index} current={body.account} onPress={setAccount} />)}
            </>
          }

          {body.type === 'POCKET' && props.accounts.length > 1 &&
            <>
              <InputLabel label="مبلغ" onChange={_pocketAmount} numeric />
              
              <Text style={styles.label}>از حساب</Text>
              {props.accounts.map((bank, index) => <BankOptionTile bank={bank} key={index} current={fromAccount} onPress={_fromAccount} />)}

              <Text style={styles.label}>به حساب</Text>
              {props.accounts.map((bank, index) => <BankOptionTile bank={bank} key={index} current={toAccount} onPress={_toAccount} />)}
            </>
          }

          {body.type === 'POCKET' && props.accounts.length === 1 &&
            <>
              <View style={styles.alertContainer}>
                <Text style={styles.alertText}>
                  برای جیب به جیب کردن باید بیش از یک حساب داشته باشید
                </Text>
              </View>
            </>
          }
          

          <View style={{height: 50}}></View>
        </ScrollView>

        <Pressable style={styles.submitButton} onPress={submit}>
          <Image 
            source={require('../assets/plus.png')}
            style={{width: 15, height: 15, tintColor: '#ffffff'}}
          />
          <Text style={{color: '#ffffff', marginRight: 12}}>افزودن تراکنش</Text>
        </Pressable>
      </View>
      
      <CategorySelectorModal visible={visibleCategory} onChoose={setCategory} />
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  headerText: {
    color: color.code1,
  },
  label: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 7,
    marginTop: 20
  },
  submitButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#1f3f60',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  alertContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'center'
  },
})

const mapStateToProps = state => ({
  rootView: state.controller.rootView,
  accounts: state.user.accounts,
  period: state.user.period,
});

const mapDispatchToProps = dispatch => ({
  hideRootView: () => dispatch(hideRootView()),
  getCategorizedExpensesAsync: () => dispatch(getCategorizedExpensesAsync()),
  getUnCategorizedExpensesAsync: () => dispatch(getUnCategorizedExpensesAsync()),
  getUnCategorizedIncomesAsync: () => dispatch(getUnCategorizedIncomesAsync()),
  getCategorizedIncomesAsync: () => dispatch(getCategorizedIncomesAsync()),
  getSharesAsync: () => dispatch(getSharesAsync()),
  getBudgetsAsync: () => dispatch(getBudgetsAsync()),
  getAccountsAsync: () => dispatch(getAccountsAsync()),
  getAllTransactionsAsync: () => dispatch(getAllTransactionsAsync()),
  getPieAsync: (p) => dispatch(getPieAsync(p))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);