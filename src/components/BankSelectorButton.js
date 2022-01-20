import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import Text from './Text';

import banks from '../assets/banks';

export default function Buttom({account, onPress}) {
  const [ acc, setAcc ] = useState(null);
  // const [ bank, setBank ] = useState(null);

  // useEffect(() => {
  //   const initialAcc = banks[account.];
  //   setAcc(initialAcc);
  // }, []);

  useEffect(() => {
    setAcc(account);
  }, [account]);
  
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {acc && <>
        <Image
          source={banks[acc.bank].icon}
          style={[styles.icon]}
        />

        <Text style={{marginRight: 14}}>
          {acc.account}
        </Text>

        <View style={{flex: 1}}>
          <Image 
            source={require('../assets/downarrow.png')}
            style={{width: 12, height: 12, tintColor: '#1f3f60'}}/>
        </View>
      </>}
    </Pressable>
  )
} 

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 15,
  },
  iconCircle: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 14,
    height: 20,
  }
})