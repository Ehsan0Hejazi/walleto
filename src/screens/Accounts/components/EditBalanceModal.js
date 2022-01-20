import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Image, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import sqlite from '../../../utils/sqlite';
import { getAccountsAsync } from '../../../redux/user/user.action';

import Text from '../../../components/Text';
import InputLabel from './InputLabel';
import colors from '../../../vars/color';

function EditBalanceModal(props) {
  const [ val, setVal ] = useState();

  useEffect(() => {
    if (props.initial) {
      setVal(props.initial.Balance)
    }
  }, [props.initial])

  const hideModal = () => {
    props.onhide();
  }

  const setBalance = val => {
    setVal(val);
  }
  
  const editBalanceDB = async () => {
    await sqlite(`UPDATE accounts SET Balance='${val}' WHERE AccountID=${props.initial.AccountID}`);
  }

  const edit = async () => {
    if (val > 0) {
      await editBalanceDB();
      props.getAccountsAsync()
      props.onhide();
    } else {
      ToastAndroid.show('مبلغ وارد شده صحیح نمی باشد', ToastAndroid.SHORT);
    }
  }

  if (props.visible) {
    return (
      <TouchableWithoutFeedback onPress={() => props.onhide()}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.boxContainer}>
            <View style={{flex: 1, paddingLeft: 15, paddingRight: 15}}>
              <View style={styles.header}>
                <Text style={{color: colors.code2}}>ویرایش موجودی</Text>
              </View>
    
              <InputLabel label="مبلغ موجودی حساب" onChange={setBalance} defaultValue={props.initial.Balance} numeric />
            </View>
            <Pressable style={styles.editButton} onPress={edit}>
              <Text style={{color: '#ffffff'}}>ویرایش</Text>
            </Pressable>
          </Pressable>

          <Pressable style={[styles.closeButton]} onPress={hideModal}>
            <Image
              source={require('../../../assets/close.png')}
              style={{ width: '40%', height: '40%' }}
            />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0 ,0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    zIndex: 5000,
  },
  boxContainer: {
    width: '80%',
    height: 220,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderRadius: 3,
  },
  editButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.code1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 13,
    right: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = state => ({
  accounts: state.user.accounts
});

const mapDispatchToProps = dispatch => ({
  getAccountsAsync: () => dispatch(getAccountsAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBalanceModal);