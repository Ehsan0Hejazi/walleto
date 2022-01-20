import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';

import banks from '../assets/banks';

import Text from './Text';

export default function CategorySelector({ onChoose, visible, accounts }) {
  if (visible) {
    return (
      <View style={styles.modal}>
        <View style={styles.optionContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={{ padding: 10, paddingTop: 0 }}
            data={accounts}
            renderItem={({ item }) => <Row account={item} onSelect={onChoose} />
          }
          />
        </View>
      </View>
    )
  } else {
    return null
  }
}


function Row({ account, onSelect }) {
  return (
    <Pressable style={styles.rowContainer} onPress={() => { onSelect(account) }} >
      <Image
        source={banks[account.bank].icon}
        style={{ width: 14, height: 20 }}
      />

      <View style={{flex: 1}}>
        <Text style={{ marginRight: 10, textAlign: 'left' }}>
          {account.account}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  iconCircle: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionContainer: {
    width: '100%',
    // height: 50,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 5,
    overflow: 'hidden'
  },
  searchContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f2',
    fontSize: 10,
    fontFamily: 'IRANYekanRegular',
    textAlign: 'right',
    paddingRight: 15,
    paddingLeft: 15,
  },
  searchIcon: {
    width: 18,
    height: 18,
    position: 'absolute',
    left: 14
  },
  rowContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: 40,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 10,
    borderRadius: 3,
  }
});