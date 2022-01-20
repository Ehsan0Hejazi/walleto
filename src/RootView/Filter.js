import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { connect } from 'react-redux';
import Text from '../components/Text';
import color from '../vars/color';
import DropDownMenu from './components/DropDownMenu';
import BottomSheet from './components/BottomSheet';
import BankOptionTile from './components/BankOptionTile';
import Box from './components/CategorySelectorBox';
import tk, {types} from '../vars/types';
import dk, { dates } from '../vars/date';
import { TopTabs } from '../vars/topTabs';
import {
  // setCostCatFilter,
  // setCostUnCatFilter,
  // setIncomeCatFilter,
  // setIncomeUnCatFilter,
  setFilter,
  hideRootView
} from '../redux/controller/controller.action';
import InputLabel from './components/InputLabel';

import {
  getCategorizedExpensesAsync,
  getUnCategorizedExpensesAsync,
  getCategorizedIncomesAsync,
  getUnCategorizedIncomesAsync
} from '../redux/user/user.action';

function AddTransaction(props) {
  const [ visibleCategory, setVisibleCategory ] = useState(false);
  
  const [ body, setBody ] = useState({
    category: props.filter.category || 'food',
    date: props.filter.date || 'DAY',
    account: props.filter.account || 'all',
    from: props.filter.from || null,
    to: props.filter.to || null,
  });

  const setCategory = val => {
    setBody({
      ...body,
      category: val
    });

    setVisibleCategory(false)
  }

  const setDate = val => {
    setBody({
      ...body,
      date: val
    })
  }

  const setAccount = val => {
    setBody({
      ...body,
      account: val 
    })
  }

  const setFrom = val => {
    setBody({
      ...body,
      from: val 
    })
  }

  const setTo = val => {
    setBody({
      ...body,
      to: val 
    })
  }

  const submit = () => {
    props.setFilter(body);

    if (props.currentTopTab === TopTabs.COST_CAT) {
      props.getCategorizedExpensesAsync(body)
    } else if (props.currentTopTab === TopTabs.COST_UNCAT) {
      props.getUnCategorizedExpensesAsync(body)
    } else if (props.currentTopTab === TopTabs.INCOME_CAT) {
      props.getCategorizedIncomesAsync(body)
    } else if (props.currentTopTab === TopTabs.INCOME_UNCAT) {
      props.getUnCategorizedIncomesAsync(body)
    }

    props.hideRootView();
  }

  return (
    <BottomSheet hideModal={() => {}}>
      <View style={{flex:1}}>
        <ScrollView style={{paddingLeft: 20, paddingRight: 20}} >
          <View style={styles.header}>
            <Text style={styles.headerText}>فیلتر</Text>
          </View>

          {(props.currentTopTab !== TopTabs.COST_UNCAT && 
            props.currentTopTab !== TopTabs.INCOME_UNCAT) &&
            <View>
                <Text style={styles.label}>دسته بندی</Text>
                <Box initial={body.category} onChoose={setCategory} />
            </View>
          }
          
          {/* amount range */}
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <InputLabel label="تا مبلغ" onChange={setTo} defaultValue={body.to} numeric />
            </View>
            <View style={{width: 15}}></View>
            <View style={{flex: 1}}>
              <InputLabel label="از مبلغ" onChange={setFrom} defaultValue={body.from} numeric />
            </View>
          </View>
          
          <View style={styles.selectMenusContainer}>
            {/* <View style={{flex: 1}}>
              <DropDownMenu 
                options={tk}
                initialState={props.rootView.type}
                onChange={setType}
                type={{obj: types, arr: tk}}
              />
            </View> */}
            {/* <View style={{width: 15}}></View> */}
            <View style={{flex: 1}}>
              <DropDownMenu 
                options={dk}
                initialState={props.filter.date}
                onChange={setDate}
                type={{obj: dates, arr: dk}}
              />
            </View>
          </View>

          <Text style={styles.label}>شماره حساب</Text>
          {[{BankName: 'all'}, ...props.accounts].map((bank, index) => <BankOptionTile bank={bank} key={index} current={body.account} onPress={setAccount} />)}
        </ScrollView>

        <Pressable style={styles.submitButton} onPress={submit}>
          <Text style={{color: '#ffffff'}}>اعمال فیلتر</Text>
        </Pressable>
      </View>
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
    marginTop: 15
  },
  submitButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#1f3f60',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  selectMenusContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20
  },
  label: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 7,
    marginTop: 20
  },
})

const mapStateToProps = state => ({
  rootView: state.controller.rootView,
  accounts: state.user.accounts,
  currentTopTab: state.controller.currentTopTab,
  // costCatFilter: state.controller.costCatFilter,
  // costUnCatFilter: state.controller.costUnCatFilter,
  // incomeCatFilter: state.controller.incomeCatFilter,
  // incomeUnCatFilter: state.controller.incomeUnCatFilter,
  filter: state.controller.filter,
});

const mapDispatchToProps = dispatch => ({
  setFilter: data => dispatch(setFilter(data)),
  getCategorizedExpensesAsync: filter => dispatch(getCategorizedExpensesAsync(filter)),
  getUnCategorizedExpensesAsync: filter => dispatch(getUnCategorizedExpensesAsync(filter)),
  getCategorizedIncomesAsync: filter => dispatch(getCategorizedIncomesAsync(filter)),
  getUnCategorizedIncomesAsync: filter => dispatch(getUnCategorizedIncomesAsync(filter)),
  hideRootView: () => dispatch(hideRootView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);

