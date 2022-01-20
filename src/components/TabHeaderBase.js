import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function HeaderMenu({ children, navigation, title }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const dims = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [borderWidth, setBorderWidth] = useState(0);
  const [bottomSlop, setBottomSlop] = useState(0);
  const [open, setStatus] = useState(false);

  useEffect(() => {
    navigation.addListener('blur', () => {
      _hide();
    });
  }, []);

  const _show = () => {
    setBorderWidth(1);

    Animated.parallel([
      Animated.timing(dims,
        {
          toValue: { x: 200, y: 130 },
          duration: 100,
          useNativeDriver: false
        },
      ).start(() => {
        setBottomSlop(height);
        setStatus(true);
      }),
      Animated.timing(opacity,
        {
          toValue: 1,
          duration: 100,
          useNativeDriver: false
        }
      ).start()
    ]);
  }

  const _hide = () => {
    setBorderWidth(0);

    Animated.parallel([
      Animated.timing(dims,
        {
          toValue: { x: 0, y: 0 },
          duration: 100,
          useNativeDriver: false
        },
      ).start(() => {
        setBottomSlop(0);
        setStatus(false);
      }),
      Animated.timing(opacity,
        {
          toValue: 0,
          duration: 100,
          useNativeDriver: false
        }
      ).start()
    ]);
  }

  const _profile = () => {
    navigation.navigate('Profile');
    _hide();
  }

  return (
    <View style={styles.container} hitSlop={{ bottom: bottomSlop }}>
      <>
      <Pressable style={styles.button} onPress={_show}>
        <Image style={styles.icon} source={require('../assets/menu.png')} />
      </Pressable>

      <View style={{ flex: 1, height: '100%', flexDirection: 'row-reverse' }}>
        <View style={{ justifyContent: 'center', padding: 10 }}>
          <Text style={{ color: '#ffffff' }}>{title ? title : ''}</Text>
        </View>
        {children}
      </View>

      {/* header menu */}
      {open &&
        <TouchableWithoutFeedback onPress={_hide}>
          <View style={[styles.backTapInvisible]} onTouchMove={_hide}>
            
          </View>
        </TouchableWithoutFeedback>
      }
      <Animated.View style={[styles.menuContainer, { width: dims.x, height: dims.y, borderWidth, opacity }]}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Pressable style={styles.closeBut} onPress={_hide}>
            <Image style={{ width: 12, height: 12 }} source={require('../assets/close.png')} />
          </Pressable>
        </View>

        <Pressable style={{ flex: 1, padding: 5 }} onPress={_profile}>
          <View style={[styles.rowContainer, { backgroundColor: '#e6ffff' }]}>
            <Image style={{ width: 15, height: 15, tintColor: '#00b3b3' }} source={require('../assets/user.png')} />
            <Text style={{ color: '#00b3b3', fontSize: 12, marginRight: 10 }}>حساب کاربری</Text>
          </View>
        </Pressable>

        <Pressable style={{ flex: 1, padding: 5 }}>
          <View style={styles.rowContainer}>
            <Image style={{ width: 15, height: 15, tintColor: '#1f3f60' }} source={require('../assets/exit.png')} />
            <Text style={{ color: '#19334d', fontSize: 12, marginRight: 10 }}>خروج</Text>
          </View>
        </Pressable>
      </Animated.View>
      </>
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
    width: 17,
    height: 17,
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
  backTapInvisible: {
    width: width, 
    height: height, 
    position: 'absolute', 
    top: 0
  }
})

export default HeaderMenu;