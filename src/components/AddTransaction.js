import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Text from './Text';
import DropDownMenu from './DropDownMenu';
import InputLabel from './InputLabel';

export default function AddTransaction({ modal, onChange }) {
  const [ formData, setFormData ] = useState({
    kind: modal.initialVal.kind,
    description: modal.initialVal.description,
    category: modal.initialVal.category,
    expense: modal.initialVal.expense,
    account: modal.initialVal.account , //if not choose the first account index
  });

  useEffect(() => {
    onChange && onChange(formData);
  }, [formData]);

  const _kind = val => {
    setFormData({
      ...formData,
      kind: val
    })
  }
  const _description = val => {
    setFormData({
      ...formData,
      description: val
    })
  }
  const _category = val => {
    setFormData({
      ...formData,
      category: val
    })
  }

  const _expense = val => {
    setFormData({
      ...formData,
      expense: val,
    })
  }

  const _account = val => {
    setFormData({
      ...formData,
      account: val,
    })
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={{ fontSize: 12 }}>افزودن تراکنش</Text>
      </View>

      <Text style={styles.inputLabel}>نوع</Text>
      <DropDownMenu
        options={['هزینه', 'درآمد', 'جیب به جیب']}
        onChange={_kind}
        initialState={modal.initialVal.kind}
      />

      <InputLabel label="شرح" onChange={_description} defaultValue={modal.initialVal.description} />

      <Text style={styles.inputLabel}>دسته بندی</Text>
      <DropDownMenu
        options={['هزینه', 'درآمد', 'جیب به جیب']}
        onChange={_category}
      />

      <InputLabel label="مبلغ" onChange={_expense} defaultValue={modal.initialVal.expense}/>

      <Text style={styles.inputLabel}>شماره حساب</Text>
      <DropDownMenu
        options={['هزینه', 'درآمد', 'جیب به جیب']}
        onChange={_account}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputLabel: {
    fontSize: 11,
    color: '#777777',
    marginBottom: 7,
    marginTop: 20,
  },
})