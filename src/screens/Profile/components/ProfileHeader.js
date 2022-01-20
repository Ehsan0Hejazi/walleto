import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, Animated, Dimensions } from 'react-native';
import Text from '../../../components/Text';

const width = Dimensions.get('window').width;

function HeaderMenu({ navigation, title }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Image style={styles.icon} source={require('../../../assets/rightarrow.png')} />
      </Pressable>
      
      <View style={{flex: 1, height: '100%', flexDirection: 'row-reverse'}}>
        <View style={{justifyContent: 'center', padding: 10}}>
          <Text style={{color: '#ffffff'}}>{title ? title: ''}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#19334d',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    zIndex: 1000
  },
  button: {
    width: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ffffff'
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ffffff',
    borderColor: '#f2f2f2',
    zIndex: 2000,
    overflow: 'hidden',
    elevation: 2
  },
  closeBut: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingLeft: 10,
    borderRadius: 3,
  },
})

export default HeaderMenu;