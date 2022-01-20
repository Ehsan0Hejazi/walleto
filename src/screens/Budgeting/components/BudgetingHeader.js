import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';

import Text from '../../../components/Text';

import TabHeaderBase from '../../../components/TabHeaderBase';

function BudgetingHeader({ navigation }) {
  return (
    <TabHeaderBase navigation={ navigation } title="بودجه بندی">
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

export default BudgetingHeader;