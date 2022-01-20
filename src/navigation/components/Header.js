import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

function HomeHeader({ navigation }) {
  useEffect(() => {
    navigation.addListener('',() => {
      console.log('dwwdwd')
    })
  }, []);
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Image style={styles.icon} source={require('../../assets/menu.png')} />
      </Pressable>
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
  },
  button: {
    width: 50,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ffffff'
  }
})

export default HomeHeader;