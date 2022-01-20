import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import colors from '../../../vars/color';

import color from '../../../vars/color';

export default function AnimatedInput(props) {
  const translate = useRef(new Animated.ValueXY({x: 0, y: 0})).current; //to -15
  const fontSize = useRef(new Animated.Value(14)).current; //to 10
  
  const [ value, setValue ] = useState(props.initialValue || '');

  useEffect(() => {
    if (props.initialValue) {
      _labelUp();
    }
  })

  useEffect(() => {
    props.onChange && props.onChange(value)
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
      Animated.timing(translate, {
        toValue: {
          x: 15,
          y: -40
        },
        duration: 200,
        useNativeDriver: false,
      }).start(),
      Animated.timing(fontSize, {
        toValue: 10,
        duration: 200,
        useNativeDriver: false,
      }).start(),
    ])
  }

  const _labelDown = () => {
    if (value.length === 0) {
      Animated.parallel([
        Animated.timing(translate, {
          toValue: {
            x: 0,
            y: 0,
          },
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
        defaultValue={props.initialValue}
      />
      
      <Animated.Text style={[styles.label, { fontSize, transform: [{ translateY: translate.y}, {translateX: translate.x}] }]}>
        {props.placeholder}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 3,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    paddingLeft: 15,
    paddingRight: 15,
    color: color.code1,
    fontSize: 12,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: 'IRANYekanRegular',
    zIndex: 1000
  },
  label: {
    fontFamily: 'IRANYekanRegular',
    position: 'absolute',
    right: 15,
    color: '#999999',
  }
})