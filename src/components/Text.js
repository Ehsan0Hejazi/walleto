import React from 'react';
import { Text as Texty } from 'react-native';

export default function Text({ children, style, numberOfLines }) {
  return (
    <Texty style={[{fontFamily: 'IRANYekanRegular', fontSize: 12}, style]} 
      numberOfLines={numberOfLines ? numberOfLines : 1000}
    >
      {children}
    </Texty>
  )
}