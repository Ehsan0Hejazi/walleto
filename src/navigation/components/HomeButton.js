import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

function HomeButton({ focused, navigation }) {
  const styles = StyleSheet.create({
    container: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      borderRadius: 50,
      marginBottom: 35,
      zIndex: 20000,
    },
    innerContainer: {
        width: '80%',
        height: '80%',
        borderRadius: 50,
        backgroundColor: focused ? '#e06d5f' : '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
      width: '40%',
      height: '40%',
      tintColor: focused ? '#ffffff' : '#19334d'
    }
  })
  
  return (
    <View style={styles.container} activeOpacity={1} >
      <View style={styles.innerContainer}>
        <Image style={styles.icon} source={require('../../assets/home.png')}/>
      </View>
    </View>
  )
}

export default HomeButton;