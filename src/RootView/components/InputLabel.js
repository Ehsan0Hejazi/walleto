import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Text from '../../components/Text';
import toCurrency from '../../utils/toCurrency';

export default function InputLabel({ label, onChange, defaultValue, numeric }) {
  const [ value, setValue ] = useState(defaultValue);

  const _onChange = val => {
    const newVal = numeric ? val.replace(/\D/g,'') : val;
    onChange(newVal);
    setValue(newVal);
  }

  return (
    <View>
      <Text style={[styles.inputLabel]}>{label}</Text>
      <TextInput 
        style={styles.textInput} 
        onChangeText={_onChange}
        keyboardType={numeric ? 'numeric' : 'default'}
        value={numeric ? toCurrency(value): value}
      /> 
    </View>
  )
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 7,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: '#f2f2f2',
    height: 40,
    borderRadius: 3,
    direction: 'rtl',
    textAlign: 'right',
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'IRANYekanRegular',
    color: '#1f3f60',
    fontSize: 12,
    padding: 0,
  }
})