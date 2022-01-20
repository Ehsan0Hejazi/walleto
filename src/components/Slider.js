import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

const width = Dimensions.get('window').width;

function Slider({ children }) {
  const [index, setIndex] = useState(0);

  const _onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const i = Math.round(offsetX / width);
    setIndex(i);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal pagingEnabled
        onMomentumScrollEnd={_onScroll}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      <View style={styles.dotContainer}>
        {children.map((val, i)=> <Dot key={i} index={i} currentIndex={index} /> )}
      </View>
    </View>
  )
}

function Dot({ index, currentIndex }) {
  return (
    <View style={[styles.dot, 
      {backgroundColor: index === currentIndex ? '#4d4d4d' : '#b3b3b3'}
    ]}></View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  }
})

export default Slider;