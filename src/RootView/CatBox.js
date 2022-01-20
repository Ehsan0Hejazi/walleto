import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Image, BackHandler, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import sqlite from '../utils/sqlite';
import {getCategorizedExpensesAsync, 
  getUnCategorizedExpensesAsync,
  getUnCategorizedIncomesAsync,
  getCategorizedIncomesAsync,
  getSharesAsync,
  getAllTransactionsAsync,
  getBudgetsAsync
} from '../redux/user/user.action';

import Box from './components/CategorySelectorBox';

import color from '../vars/color';
import Text from '../components/Text';
import colors from '../vars/color';

import { hideRootView } from '../redux/controller/controller.action';


function CatBox(props) {
  const { rootView } = props;
  const [ cat, setCat ] = useState(rootView.initialValues.prime);

  useEffect(() => {
    const _handler = () => {
      props.hideRootView();
      return true;
    }
    const bh = BackHandler.addEventListener('hardwareBackPress', _handler);
    return () => bh.remove();
  }, []);

  const _change = val => {
    setCat(val);
  }

  const _submit = async () => {
    let query = `UPDATE handy SET Category = '${cat}' WHERE HandyID =${rootView.initialValues.id}`;
    let reduceQuery = `UPDATE budgets SET Balance = Balance - ${rootView.initialValues.amount} WHERE category = '${cat}';`;
    await Promise.all([sqlite(query), sqlite(reduceQuery)])
    props.getCategorizedExpensesAsync();
    props.getUnCategorizedExpensesAsync();
    props.getCategorizedIncomesAsync();
    props.getUnCategorizedIncomesAsync();
    props.getAllTransactionsAsync();
    props.getSharesAsync();
    props.getBudgetsAsync();
    props.hideRootView();
  }

  return (
    <TouchableWithoutFeedback onPress={() => props.hideRootView()}>
      <View style={styles.containerModal}>
        <Pressable style={styles.container}>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={styles.header}>
              <Text>انتخاب دسته بندی</Text>
              
              <Pressable style={styles.closeContainer} onPress={() => props.hideRootView()}>
                <Image source={require('../assets/close.png')} style={{width: 15, height: 15}}/>
              </Pressable>
            </View>
            <Box initial={rootView.initialValues.prime} onChoose={_change}/>
          </View>

          <Pressable style={styles.submit} onPress={_submit}>
            <Text style={{color: '#ffffff'}}>ثبت</Text>
          </Pressable>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  containerModal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    height: 305,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    overflow: 'hidden'
  },
  header: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 15,
  },
  closeContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  submit: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.code1
  }
})

const mapStateToProps = state => ({
    rootView: state.controller.rootView
});

const mapDispatchToProps = dispatch => ({
  hideRootView: () => dispatch(hideRootView()),
  getCategorizedExpensesAsync: () => dispatch(getCategorizedExpensesAsync()),
  getUnCategorizedExpensesAsync: () => dispatch(getUnCategorizedExpensesAsync()),
  getUnCategorizedIncomesAsync: () => dispatch(getUnCategorizedIncomesAsync()),
  getCategorizedIncomesAsync: () => dispatch(getCategorizedIncomesAsync()),
  getSharesAsync: () => dispatch(getSharesAsync()),
  getAllTransactionsAsync: () => dispatch(getAllTransactionsAsync()),
  getBudgetsAsync: () => dispatch(getBudgetsAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(CatBox);