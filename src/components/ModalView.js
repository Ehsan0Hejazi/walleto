import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

function ModalView({ modalView }) {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef();
  visibleRef.current = visible;

  useEffect(() => {
    
  }, [])

  if (visible) {
    return (
      <View style={styles.container}>
        
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})

const mapStateToProps = state => ({
  modalView: state.controller.modalView
});

const mapDispatchToProps = dispatch => ({
  hideModalView: () => dispatch(hideModalView())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalView);