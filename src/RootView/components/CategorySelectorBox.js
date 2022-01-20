import React, { useRef, useState, useEffect } from 'react';
import { View, 
         StyleSheet, 
         Image, 
         Animated, 
         Pressable, 
         TextInput, 
         FlatList ,
      } from 'react-native';

import categories from '../../assets/categories';

import Text from '../../components/Text';

export default function CategorySelector({ onChoose, initial }) {
  const [ category, setCategory ] = useState(initial || 'food');
  const [ catArr, setCatArr ] = useState([]);
  const [ sortedArr, setSortedArr ] = useState([]);

  useEffect(() => {
    createArrayCats();
  }, [])

  useEffect(() => {
    if (category) {
      onChoose && onChoose(category);
    }
  }, [category]);

  const createArrayCats = () => {
    const keys = Object.keys(categories).filter(e => e !== 'uncat' && e!== 'pocket');
    const arr = keys.map(element => {
      return {
        ...categories[element],
        category: element
      }
    });

    setCatArr(arr);
    setSortedArr(arr);
  }

  const _onSearchType = val => {
    const regex = new RegExp(val);
    const filteredCats = catArr.filter(e => {
      return regex.test(e.label)
    });

    const rest = catArr.filter(e => {
      return !(regex.test(e.label));
    });

    setSortedArr(filteredCats.concat(rest));
  }

  const onSelect = (cat) => {
    setCategory(cat);
  }

  return (
    <View style={styles.optionContainer}>
      <View>
        <Header onSearch={_onSearchType} key="12" />
      </View>

      {<FlatList
        columnWrapperStyle={{justifyContent: 'space-between', flexDirection: 'row-reverse'}}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.category}
        ListFooterComponent={() => <View style={{ height: 20 }}></View>}
        data={sortedArr.slice(0, 6)}
        style={{ height: 150 }}
        renderItem={({ item }) =><Row option={item.category} current={category} onSelect={onSelect} />}
        numColumns={3}
      />}
    </View>
  )
}


function Row({ option, onSelect, current }) {
  const color = current === option ? categories[option].color : '#bfbfbf';

  return (
    <Pressable style={[styles.rowContainer, {borderColor: color}]} onPress={() => { onSelect(option) }}>
      <View style={[styles.iconCircle, { borderColor: color }]}>
        <Image
          source={categories[option].icon}
          style={{ width: '60%', height: '60%', tintColor: color }}
        />
      </View>
      <Text style={{ color: color, marginRight: 10, fontSize: 9 }}>
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
        source={require('../../assets/search.png')}
        style={styles.searchIcon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  iconCircle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  rowContainer: {
    width: '30%',
    height: 50,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 15,
    justifyContent: 'center'
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
});