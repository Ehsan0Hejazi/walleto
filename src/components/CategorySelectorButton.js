import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import Text from './Text';

import categories from '../assets/categories';

export default function Buttom({category, onPress}) {
  const [ catKeys, setCatKeys ] = useState(null);
  const [ cat, setCat ] = useState(null);
   
  useEffect(() => {
    setCatKeys(Object.keys(categories))
  }, []);

  useEffect(() => {
    if (catKeys) {
      const initialCat = categories[catKeys[0]];
      setCat(initialCat);
    }
  }, [catKeys]);

  useEffect(() => {
    if (category) {
      setCat(categories[category]);
    }
  }, [category]);
  
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {cat && <>
        <View style={[styles.iconCircle, {borderColor: cat.color}]}>
          <Image
            source={cat.icon}
            style={[styles.icon, {tintColor: cat.color}]}
          />
        </View>

        <Text style={{color: cat.color, marginRight: 14}}>
            {cat.label}
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
    width: '60%',
    height: '60%',
  }
})