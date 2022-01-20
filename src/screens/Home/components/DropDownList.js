import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Pressable, Animated, Easing } from 'react-native';

import Text from '../../../components/Text';

import banks from '../../../assets/bank';

import toCurrency from '../../../utils/toCurrency';

function Row({ option }) {
  const [ obj, setObj ] = useState();
  useEffect(() => {
    const obj = banks.filter(e => {
      return e.name === option.BankName
    });
    setObj(obj[0]);
  }, [])
  return (
    <View style={styles.rowContainer}>
      <View style={{flex: 1, padding: 5, flexDirection: 'row'}}>
        <View style={{flex: 1.5, flexDirection: 'row'}}>
          <Text style={{ marginRight: 5, fontSize: 10, color: '#777777' }}>تومان</Text>
          <Text style={{ color: '#1f3f60', textAlign: 'left', fontSize: 12}}>{toCurrency(option.Balance)}</Text>
        </View>

        <View style={{flex:2}}>
          <Text style={{ color: '#777777', textAlign: 'right', fontSize: 10}}>{obj && obj.label}</Text>
        </View>
      </View>

      <Image source={obj && obj.icon} style={styles.icon}/>
    </View>
  )
}

function Menu({ options }) {
  const [ isOpen, open ] = useState(false);
  const containerHeight = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const height = useRef((options.length * 50) + 20).current;
  
  const _toggle = () => {
    open(!isOpen);
    if (isOpen) {
      Animated.parallel([
        Animated.timing(containerHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false
        }).start(),
      ])
    } else {
      Animated.parallel([
        Animated.timing(containerHeight, {
          toValue: height ,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(containerOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false
        }).start(),
      ])
    }
    
  }

  const _onPress = (val) => {
    open(false);
    setValue(val);
    onChange(val);
  }

  return (
    <View style={styles.menuContainer}>
      <Pressable style={styles.toggleRow} activeOpacity={0.9} onPress={_toggle}>
        <View style={styles.toggleButton}>
          {!isOpen ? 
            <Image style={styles.arrow} source={require('../../../assets/downarrow.png')} />
            :
            <Image style={styles.arrow} source={require('../../../assets/uparrow.png')} />
          }
        </View>

        <View style={styles.innerToggleRow}>
          <Text style={styles.toggleFont}>
            گزارش مانده حساب ها
          </Text>
        </View>
      </Pressable>
       
      <Animated.View style={[styles.optionContainer, { height: containerHeight, opacity: containerOpacity }]} >
          {options.length > 0 ?
            options.map((option, i) => <Row option={option} key={i} onPress={_onPress} />) :
            <View style={{width: '100%', height: 20, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#999999', fontSize: 10}}>هیج حسابی یافت نشد</Text>
            </View>
          }
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    height: 40,
    paddingRight: 10,
    paddingLeft: 7,
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuContainer: {
    width: '100%',
  },
  toggleRow: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  toggleButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1f3f60',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerToggleRow: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20
  },
  arrow: {
    width: '30%',
    height: '30%',
    tintColor: '#ffffff'
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    overflow: 'hidden',
  },
  toggleFont: {
    fontSize: 12,
    color: '#1f3f60'
  },
  icon: {
    width: 18,
    height: 22
  }
})

export default Menu;