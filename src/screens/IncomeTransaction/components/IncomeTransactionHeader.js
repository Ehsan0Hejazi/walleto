import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import Text from '../../../components/Text';

import TabHeaderBase from '../../../components/TabHeaderBase';

import { showFilter, setFilter } from '../../../redux/controller/controller.action';
import {
  getCategorizedExpensesAsync,
  getUnCategorizedExpensesAsync,
  getCategorizedIncomesAsync,
  getUnCategorizedIncomesAsync,
} from '../../../redux/user/user.action';

function ExpenseTransactionHeader(props) {
  const _showFilter = () => {
    if (props.accounts.length > 0) {
      props.showFilter({});
    } else {
      ToastAndroid.show('هیچ حسابی جهت فیلتر کردن یافت نشد' , ToastAndroid.SHORT)
    }
  }

  const _refresh = () => {
    props.getCategorizedExpensesAsync();
    props.getUnCategorizedExpensesAsync();
    props.getCategorizedIncomesAsync();
    props.getUnCategorizedIncomesAsync();
    props.setFilter({});
  }

  return (
    <TabHeaderBase navigation={ props.navigation } title="تراکنش درآمد">
      <View style={styles.container}>
        <Pressable style={styles.butContainer} onPress={_showFilter}>
          <Image source={require('../../../assets/filter.png')} style={{tintColor: '#ffffff', width: 20, height: 20}}/>
        </Pressable>

        {Object.keys(props.filter).length > 0 && 
          <Pressable style={styles.butContainer} onPress={_refresh}>
            <Image source={require('../../../assets/refresh.png')} style={{tintColor: '#ffffff', width: 20, height: 20}}/>
          </Pressable>
        }
      </View>
    </TabHeaderBase>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
    flexDirection: 'row'
  },
  butContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  modal: state.controller.modal,
  accounts: state.user.accounts,
  filter: state.controller.filter
});

const mapDispatchToProps = dispatch => ({
  showFilter: data => dispatch(showFilter(data)),
  getCategorizedExpensesAsync: () => dispatch(getCategorizedExpensesAsync()),
  getUnCategorizedExpensesAsync: () => dispatch(getUnCategorizedExpensesAsync()),
  getUnCategorizedIncomesAsync: () => dispatch(getUnCategorizedIncomesAsync()),
  getCategorizedIncomesAsync: () => dispatch(getCategorizedIncomesAsync()),
  setFilter: data => dispatch(setFilter(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTransactionHeader);