import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import Text from '../../../components/Text';

import TabHeaderBase from '../../../components/TabHeaderBase';

function HomeHeader({ navigation }) {
  return (
    <TabHeaderBase navigation={ navigation } title="حساب ها">
      <View style={styles.container}>
        
      </View>
    </TabHeaderBase>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
})

export default HomeHeader;