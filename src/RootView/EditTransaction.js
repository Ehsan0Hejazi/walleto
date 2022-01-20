import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import Text from '../components/Text';

import color from '../vars/color';
import sqlite from '../utils/sqlite';
import { hideRootView } from '../redux/controller/controller.action';
import {getCategorizedExpensesAsync, 
  getUnCategorizedExpensesAsync,
  getUnCategorizedIncomesAsync,
  getCategorizedIncomesAsync,
  getSharesAsync,
  getAllTransactionsAsync,
  getPieAsync
} from '../redux/user/user.action';

import DropDownMenu from './components/DropDownMenu';
import InputLabel from './components/InputLabel';
import CategorySelectorModal from './components/CategorySelectorModal';
import CategorySelectorButton from './components/CategorySelectorButton';
import BankOptionTile from './components/BankOptionTile';
import BottomSheet from './components/BottomSheet';
import tk, {types} from '../vars/types';

function AddTransaction(props) {
  const [visibleCategory, setVisibleCategory] = useState(false);

  const [body, setBody] = useState({
    id: props.rootView.initialValues.id,
    type: props.rootView.initialValues.type,
    description: props.rootView.initialValues.description,
    category: props.rootView.initialValues.category || 'food',
    amount: props.rootView.initialValues.amount,
    account: props.rootView.initialValues.account || props.accounts[0].BankName
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

  const _submit = async () => {
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
      let query = `UPDATE handy SET 
      BankName = '${body.account}', Type = '${body.type}', Description = '${body.description}',  Category = '${body.category}', Amount = ${body.amount} 
      WHERE HandyID = ${body.id};`;
      await sqlite(query);
      //invoke just the part has changed
      props.getCategorizedExpensesAsync();
      props.getUnCategorizedExpensesAsync();
      props.getCategorizedIncomesAsync();
      props.getUnCategorizedIncomesAsync();
      props.getSharesAsync();
      props.getAllTransactionsAsync();
      props.getPieAsync(props.period);
      props.hideRootView();
    }
  }

  const _delete = async () => {
    let query = `DELETE FROM handy WHERE HandyID ='${body.id}' ;`;
    await sqlite(query);
    props.getCategorizedExpensesAsync();
    props.getUnCategorizedExpensesAsync();
    props.getCategorizedIncomesAsync();
    props.getUnCategorizedIncomesAsync();
    props.getAllTransactionsAsync();
    props.getSharesAsync();
    props.hideRootView();
  }

  return (
    <BottomSheet hideModal={() => setVisibleCategory(false)}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>افزودن تراکنش</Text>
          </View>

          {/* <Text style={styles.label}>نوع</Text>
          <DropDownMenu
            disabled
            options={tk}
            initialState={body.type}
            onChange={setType}
            type={{obj: types, arr: tk}}
          /> */}

          <InputLabel label="شرح" onChange={setDescription} defaultValue={body.description} />

          <Text style={styles.label}>دسته بندی</Text>
          <CategorySelectorButton onPress={() => setVisibleCategory(true)} category={body.category} />

          <InputLabel label="مبلغ" onChange={setAmount} defaultValue={body.amount} numeric />

          <Text style={styles.label}>شماره حساب</Text>
          {props.accounts.map((bank, index) => <BankOptionTile bank={bank} key={index} current={body.account} onPress={setAccount} />)}


          <View style={{ height: 50 }}></View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.submitButton, {backgroundColor: '#ffffff'}]} onPress={_delete}>
            <Text style={{ color: 'red' }}>حذف</Text>
          </Pressable>

          <Pressable style={styles.submitButton} onPress={_submit}>
            <Text style={{ color: '#ffffff' }}>ثبت ویرایش</Text>
          </Pressable>
        </View>
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
  buttonContainer: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e2e2',
  },
  submitButton: {
    flex: 1,
    backgroundColor: color.code1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
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
  getAllTransactionsAsync: () => dispatch(getAllTransactionsAsync()),
  getPieAsync: (p) => dispatch(getPieAsync(p))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);

