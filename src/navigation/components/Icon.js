import React from 'react';
import { Image } from 'react-native';

export default function Icon({ color, name }) {
    const icon = () => {
      switch (name) {
        case 'a': return require('../../assets/money-bag.png');
        case 'b': return require('../../assets/revenue.png');
        case 'c': return require('../../assets/loss.png');
        case 'd': return require('../../assets/wallet.png');
      }
    }
  
    return (
      <Image 
        style={{width: 22, height: 22, tintColor: color}} 
        source={icon()}
      />
    )
}