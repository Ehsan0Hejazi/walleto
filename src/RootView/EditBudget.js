import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { connect } from 'react-redux';

import Text from '../components/Text';

import color from '../vars/color';

import InputLabel from './components/InputLabel';
import CategorySelectorModal from './components/CategorySelectorModal';
import CategorySelectorButton from './components/CategorySelectorButton';
import BottomSheet from './components/BottomSheet';
import { getBudgetsAsync } from '../redux/user/user.action';
import { hideRootView } from '../redux/controller/controller.action';
import sqlite from '../utils/sqlite';


function EditBudget(props) {
  const [ visibleCategory, setVisibleCategory ] = useState(false);
  const [ body, setBody ] = useState({
    id: props.rootView.initialValues.BudgetID,
    title: props.rootView.initialValues.Title,
    category: props.rootView.initialValues.Category || 'food',
    maxWithdraw: props.rootView.initialValues.MaxWithdrawal,
  });

  const setTitle = val => {
    setBody({
      ...body,
      title: val
    });
  }

  const setCategory = val => {
    setBody({
      ...body,
      category: val
    });

    setVisibleCategory(false)
  }

  const setMaxWithdraw = val => {
    setBody({
      ...body,
      maxWithdraw: val
    });
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
      const query = `UPDATE budgets SET
      Title = '${body.title}', MaxWithdrawal = '${body.maxWithdraw}', Balance = '${body.maxWithdraw}'
      WHERE BudgetID = '${body.id}';`
      await sqlite(query);
      props.getBudgetsAsync();
      props.hideRootView();
    }
  }

  const _delete = async () => {
    const query = `DELETE FROM budgets WHERE BudgetID = '${body.id}';`;
    await sqlite(query);
    props.getBudgetsAsync();
    props.hideRootView();
  }

  return (
    <BottomSheet hideModal={() => setVisibleCategory(false)}>
      <View style={{flex:1}}>
        <ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>ویرایش بودجه</Text>
          </View>

          <InputLabel label="عنوان بودجه" onChange={setTitle} defaultValue={body.title}/>

          <Text style={styles.label}>دسته بندی</Text>
          <View style={{opacity: 0.5}}>
            <CategorySelectorButton onPress={() => setVisibleCategory(true)} category={body.category} disabled />
          </View>

          <InputLabel label="سقف برداشت" onChange={setMaxWithdraw} defaultValue={body.maxWithdraw} numeric />

        <View style={{height: 200}}></View>
        </ScrollView>
        
        <View style={styles.subHolder}>
          <Pressable style={[styles.submitButton, {backgroundColor: '#ffffff'}]} onPress={_delete}>
            <Text style={{color: 'red'}}>حذف بودجه</Text>
          </Pressable>

          <Pressable style={styles.submitButton} onPress={_submit}>
            <Text style={{color: '#ffffff'}}>ثبت ویرایش</Text>
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
  submitButton: {
    width: '50%',
    height: 45,
    backgroundColor: '#1f3f60',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  subHolder: {
      width: '100%',
      height: 45,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderColor: '#e2e2e2',
  }
})

const mapStateToProps = state => ({
  rootView: state.controller.rootView
});

const mapDispatchToProps = dispatch => ({
  getBudgetsAsync: () => dispatch(getBudgetsAsync()),
  hideRootView: () => dispatch(hideRootView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBudget);

