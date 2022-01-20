import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import Text from '../../components/Text';

function Row({ option, onPress, obj }) {
  const _onPress = () => {
    onPress(option);
  }
  return (
    <Pressable style={styles.rowContainer} onPress={_onPress}>
      <Text style={{ color: '#777777', fontSize: 12 }}>{obj[option]}</Text>
    </Pressable>
  )
}

function Menu({ options, onChange, initialState, type, disabled }) {
  const [ isOpen, open ] = useState(false);
  const [ value, setValue ] = useState(initialState ? initialState : options[0]);

  const _toggle = () => {
    open(!isOpen);
  }

  const _onPress = (val) => {
    open(false);
    setValue(val);
    onChange && onChange(val);
  }

  return (
    <View style={styles.menuContainer}>
      <Pressable style={styles.toggleRow} activeOpacity={0.9} onPress={_toggle} disabled={disabled ? true : false}>
        { !disabled &&
          <View style={styles.toggleButton}>
            {!isOpen ? 
              <Image style={styles.arrow} source={require('../../assets/downarrow.png')} />
              :
              <Image style={styles.arrow} source={require('../../assets/uparrow.png')} />
            }
          </View>
        }

        <View style={styles.innerToggleRow}>
          
          <Text style={styles.toggleFont}>{type.obj[value]}</Text>
        </View>
      </Pressable>
      
      {isOpen && 
        <View style={styles.optionContainer}>
          {options.map((option, i) => <Row option={option} key={i} onPress={_onPress} obj={type.obj} />)}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    height: 35,
    justifyContent: 'center',
    paddingRight: 20
  },
  menuContainer: {
    width: '100%',
    height: 40,
    position: 'relative'
  },
  toggleRow: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f2f2f2'
  },
  toggleButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerToggleRow: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 15,
  },
  arrow: {
    width: '30%',
    height: '30%',
    tintColor: '#1f3f60'
  },
  optionContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f2f2f2',
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 1000,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    elevation: 1,
  },
  toggleFont: {
    fontSize: 12,
    color: '#1f3f60'
  }
})

export default Menu;