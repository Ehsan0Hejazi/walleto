import React from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import FloatAddButton from '../../components/FloatAddButton';

import ExpenseTransactionHeader from './components/ExpenseTransactionHeader';
import Tabs from './components/Tabs';

import { showAddTransaction } from '../../redux/controller/controller.action';

function ExpenseTransaction(props) {
  const _showAddTransaction = () => {
    if (props.accounts.length > 0) {
      props.showAddTransaction({
        type: 'COST'
      })
    } else {
      ToastAndroid.show('هیچ حسابی جهت ثبت تراکنش یافت نشد', ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <ExpenseTransactionHeader navigation={props.navigation} />
      <Tabs />
      <FloatAddButton onPress={_showAddTransaction} title="افزودن تراکنش"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatButton: {
    height: 40,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#1f3f60',
    position: 'absolute',
    zIndex: 1000,
    bottom: 15,
    right: 20,
    elevation: 2,
  }
})

const mapStateToProps = state => ({
  modal: state.controller.modal,
  accounts: state.user.accounts,
});

const mapDispatchToProps = dispatch => ({
  showAddTransaction: data => dispatch(showAddTransaction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTransaction);