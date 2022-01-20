import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Text from '../../components/Text';
import FloatAddButton from '../../components/FloatAddButton';

import AccountsHeader from './components/AccountsHeader';
import AccountsTile from './components/AccountsTile';
import EditBalanceModal from './components/EditBalanceModal';

import sqlite from '../../utils/sqlite';




function Accounts({ navigation, accounts }) {
  const [ visible, setVisible ] = useState(false);
  const [ initVal, setInitVal ] = useState();

  const onPressEdit = obj => {
    setInitVal(obj);
    setVisible(true);
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <AccountsHeader navigation={navigation} />
      {accounts.length !== 0 ?
        <FlatList
          style={styles.container}
          data={accounts}
          keyExtractor={item => item.AccountID.toString()}
          renderItem={({ item }) => <AccountsTile data={item} onEdit={onPressEdit} navigation={navigation} />}
          ListFooterComponent={<View style={{ height: 70 }}></View>}
        /> :

        <View style={styles.addContainer}>
          <Text style={{ color: '#999999', fontSize: 12 }}>
            هیچ حسابی ثبت نشده
          </Text>
        </View>
      }

      {/* <FloatAddButton title="افزودن حساب" /> */}
      <EditBalanceModal visible={visible} initial={initVal} onhide={() => {setVisible(false)}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  accounts: state.user.accounts
});

export default connect(mapStateToProps)(Accounts);