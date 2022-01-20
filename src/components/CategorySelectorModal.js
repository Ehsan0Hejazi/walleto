import React, { useRef, useState, useEffect } from 'react';
import { View, 
         StyleSheet, 
         Image, 
         Animated, 
         Pressable, 
         TextInput, 
         FlatList ,
      } from 'react-native';

import categories from '../assets/categories';

import Text from './Text';

export default function CategorySelector({ onChoose, visible }) {  
  const [category, setCategory] = useState(null);
  const [catArr, setCatArr] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);

  useEffect(() => {
    createArrayCats();
  }, [])

  useEffect(() => {
    if (category) {
      onChoose && onChoose(category);
      setFilteredArr(catArr);
    }
  }, [category]);

  const createArrayCats = () => {
    const keys = Object.keys(categories);
    const arr = keys.map(element => {
      return {
        ...categories[element],
        category: element
      }
    });

    setCatArr(arr);
    setFilteredArr(arr);
  }

  const _onSearchType = val => {
    const regex = new RegExp(val);
    const filteredCats = catArr.filter(e => {
      return regex.test(e.label)
    });

    setFilteredArr(filteredCats);
  }

  const onSelect = (cat) => {
    if (cat === category) {
      onChoose && onChoose(category);
      setFilteredArr(catArr);
    }
    setCategory(cat);
  }

  if (visible) {
    return (
      <View style={styles.modal}>
        <View style={styles.optionContainer}>
          <View style={{ padding: 10 }}>
            <Header onSearch={_onSearchType} key="12" />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.category}
            style={{ padding: 10, height: 200, paddingTop: 0 }}
            ListFooterComponent={() => <View style={{ height: 20 }}></View>}
            data={filteredArr}
            renderItem={({ item }) => <Row option={item.category} onSelect={onSelect} />}
          />
        </View>
      </View>
    )
  } else {
    return null
  }
}


function Row({ option, onSelect }) {
  return (
    <Pressable style={styles.rowContainer} onPress={() => { onSelect(option) }} >
      <View style={[styles.iconCircle, { borderColor: categories[option].color }]}>
        <Image
          source={categories[option].icon}
          style={{ width: '60%', height: '60%', tintColor: categories[option].color }}
        />
      </View>
      <Text style={{ color: categories[option].color, marginRight: 10 }}>
        {categories[option].label}
      </Text>
    </Pressable>
  )
}

function Header({ onSearch }) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="دسته بندی مورد نظرتان را جستجو کنید"
        onChangeText={onSearch}
      />

      <Image
        source={require('../assets/search.png')}
        style={styles.searchIcon}
      />
    </View>
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
    height: 200,
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
    width: '100%',
    height: 40,
    flexDirection: 'row-reverse',
    alignItems: 'center'
  }
});