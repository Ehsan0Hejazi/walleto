import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Text from './Text';

export default function InputLabel({ label, onChange, defaultValue }) {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput 
        style={styles.textInput} 
        onChangeText={onChange}
        defaultValue={defaultValue || ''}
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
    fontSize: 12
  }
})