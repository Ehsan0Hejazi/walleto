import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';

import color from '../vars/color';

export default function AnimatedInput(props) {
  const translateY = useRef(new Animated.Value(0)).current; //to -15
  const fontSize = useRef(new Animated.Value(14)).current; //to 10
  
  const [ value, setValue ] = useState('');

  useEffect(() => {
    props.onChange(value)
  }, [value]);


  const _onFocus = () => {
    _labelUp();
  }

  const _onBlur = () => {
    _labelDown();
  }

  const _onChangeText = val => {
    setValue(val);
  }

  const _labelUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -15,
        duration: 200,
        useNativeDriver: false,
      }).start(),
      Animated.timing(fontSize, {
        toValue: 9,
        duration: 200,
        useNativeDriver: false,
      }).start(),
    ])
  }

  const _labelDown = () => {
    if (value.length === 0) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(),
        Animated.timing(fontSize, {
          toValue: 14,
          duration: 200,
          useNativeDriver: false,
        }).start(),
      ])
    }
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        onFocus={_onFocus} 
        onBlur={_onBlur}
        onChangeText={_onChangeText}
        keyboardType={props.numeric ? 'number-pad' : 'default'}
      />
      
      <Animated.Text style={[styles.label, { fontSize, transform: [{ translateY }] }]}>
        {props.placeholder}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    backgroundColor: color.code2,
    position: 'relative',
    justifyContent: 'center',
    paddingTop: 15,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    paddingLeft: 15,
    paddingRight: 15,
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'IRANYekanRegular',
    zIndex: 1000
  },
  label: {
    fontFamily: 'IRANYekanRegular',
    position: 'absolute',
    right: 15,
    color: color.code3,
  }
})