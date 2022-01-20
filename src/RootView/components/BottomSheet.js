import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Animated, Dimensions, Pressable, Image, BackHandler, TouchableWithoutFeedback } from 'react-native';
import { event } from 'react-native-reanimated';
import { connect } from 'react-redux';

const height = Dimensions.get('window').height;
import { hideRootView } from '../../redux/controller/controller.action';

function BottomSheet(props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(height - 140)).current;

  const [visible, setVisible] = useState(false);
  const visibleRef = useRef();
  visibleRef.current = visible;

  useEffect(() => {
    if (props.rootView.visible === true) {
      show();
    }
  }, [props.rootView]);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      hide();
      return visibleRef.current;
    });

    return () => handler.remove()
  }, []);

  const show = () => {
    setVisible(true);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start(),
      Animated.timing(sheetY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start()
    ])
  }

  const hide = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start(),
      Animated.timing(sheetY, {
        toValue: height,
        duration: 200,
        useNativeDriver: false
      }).start(() => {
        setVisible(false);
        props.hideRootView();
      })
    ])
  }

  const backgroundColor = opacity.interpolate({
    inputRange: [0.5, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']
  });

  if (visible) {
    return (
      <TouchableWithoutFeedback onPress={() => props.hideModal && props.hideModal()}>
        <Animated.View style={[styles.backLayer, { backgroundColor: backgroundColor, paddingTop: height*0.1 }] }>
          <Animated.View style={[styles.container, { transform: [{ translateY: sheetY }]}]}>
            {props.children}
          </Animated.View>
          
          {/* close button */}
          <Pressable style={[styles.closeButton]} onPress={hide}>
            <Image
              source={require('../../assets/close.png')}
              style={{ width: '40%', height: '40%' }}
            />
          </Pressable>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  } else {
    return null
  }

}

const styles = StyleSheet.create({
  backLayer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5000,
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    zIndex: 20
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 13,
    right: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

const mapStateToProps = state => ({
  rootView: state.controller.rootView
});

const mapDispatchToProps = dispatch => ({
  hideRootView: () => dispatch(hideRootView())
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomSheet);