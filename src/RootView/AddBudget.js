import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, ToastAndroid } from 'react-native';
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

function AddBudget(props) {
  const [ visibleCategory, setVisibleCategory ] = useState(false);
  const [ body, setBody ] = useState({
    title: props.rootView.initialValues.title,
    category: props.rootView.initialValues.category || 'food',
    maxWithdraw: props.rootView.initialValues.maxWithdraw,
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

  const submit = async () => {
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
      const catQuery = await sqlite(`SELECT COUNT(*) as count FROM budgets WHERE Category='${body.category}'`);
      const exist = catQuery.rows.item(0).count === 0 ? false : true;
      
      if (exist) {
        ToastAndroid.show('این دسته بودجه بندی شده است', ToastAndroid.SHORT);
      } else {
        const query = `INSERT INTO budgets (Title, Category, MaxWithdrawal, Balance) VALUES
        ("${body.title}", "${body.category}", ${body.maxWithdraw}, ${body.maxWithdraw});`;
        await sqlite(query);
        props.getBudgetsAsync();
        props.hideRootView();
      }
    }
  }

  return (
    <BottomSheet hideModal={() => setVisibleCategory(false)}> 
      <View style={{flex:1}}>
        <ScrollView style={{paddingLeft: 20, paddingRight: 20}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>افزودن بودجه</Text>
          </View>

          <InputLabel label="عنوان بودجه" onChange={setTitle} defaultValue={body.title}/>

          <Text style={styles.label}>دسته بندی</Text>
          <CategorySelectorButton onPress={() => setVisibleCategory(true)} category={body.category} />

          <InputLabel label="سقف برداشت" onChange={setMaxWithdraw} defaultValue={body.maxWithdraw} numeric />

        <View style={{height: 200}}></View>
        </ScrollView>

        <Pressable style={styles.submitButton} onPress={submit}>
          <Image 
            source={require('../assets/plus.png')}
            style={{width: 15, height: 15, tintColor: '#ffffff'}}
          />
          <Text style={{color: '#ffffff', marginRight: 12}}>افزودن بودجه</Text>
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
})

const mapStateToProps = state => ({
  rootView: state.controller.rootView
});

const mapDispatchToProps = dispatch => ({
  getBudgetsAsync: () => dispatch(getBudgetsAsync()),
  hideRootView: () => dispatch(hideRootView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBudget);

