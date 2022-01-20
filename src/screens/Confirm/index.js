import React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Pressable } from 'react-native';
import { connect } from 'react-redux';

import AnimatedInput from '../../components/AnimatedInput';
import Text from '../../components/Text';

import color from '../../vars/color';

const height = Dimensions.get('window').height;

function Login(props) {
  
  const _submit = () => {
    props.navigation.navigate('Tabs');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sperators}></View>
        <View style={styles.sperators}>
          <AnimatedInput placeholder="کد یک بار مصرف" onChange={val => console.log(val)} numeric />
        </View>

        <View style={styles.sperators}>
          <View style={{flex: 1}}></View>

          <Pressable style={styles.submit} onPress={_submit}>
            <Text style={styles.submitText}>تایید</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: color.code1
  },
  sperators: {
    width: '100%',
    height: height * 0.32,
    paddingLeft: 20,
    paddingRight: 20,
  },
  submit: {
    width: '100%',
    height: 50,
    backgroundColor: color.code3,
    alignSelf: 'flex-start',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    color: '#ffffff',
    fontSize: 14
  }
})

const mapStateToProps = state => ({
  user: state.user.profile,
});

export default connect(mapStateToProps)(Login);