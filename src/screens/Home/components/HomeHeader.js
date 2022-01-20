import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';

import HeaderBase from '../../../components/TabHeaderBase';

function HomeHeader({ navigation }) {
  return (
    <HeaderBase navigation={ navigation }>
      <View style={styles.container}></View>
    </HeaderBase>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default HomeHeader;