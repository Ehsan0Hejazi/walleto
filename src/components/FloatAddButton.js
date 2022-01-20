import React from 'react';
import { Pressable, Image } from 'react-native';

import Text from './Text';

export default function FAB({ onPress, title }) {
  return (
    <Pressable 
      onPress={onPress}
      style={{
        height: 40,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent:'space-between',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#1f3f60',
        position: 'absolute',
        zIndex: 1000,
        bottom: 15,
        right: 20,
        elevation: 2,
      }}
    >
      <Image 
          source={require('../assets/plus.png')}
          style={{width: 12, height: 12, tintColor: '#ffffff'}}
      />
      <Text style={{fontSize: 10, color: '#ffffff', marginRight: 10}}>{title}</Text>
    </Pressable>
  ) 
}
