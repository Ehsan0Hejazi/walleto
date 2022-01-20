import React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Pressable } from 'react-native';
import { connect } from 'react-redux';

import AnimatedInput from './components/AnimatedInput';
import Header from './components/ProfileHeader';

import Text from '../../components/Text';

import color from '../../vars/color';

const height = Dimensions.get('window').height;

function Profile(props) {
  
  const _submit = () => {
    
  }

  return (
    <View style={styles.container}>
      <Header title="حساب کاربری" navigation={props.navigation} />

      <ScrollView style={{ padding: 25 }}>
        <AnimatedInput placeholder="نام" onChange={e => {}} />
        <AnimatedInput placeholder="‌نام خانوادگی" />
        <AnimatedInput placeholder="ایمیل" />
        <AnimatedInput placeholder="شماره همراه" numeric/>

        <View style={{height: 50}}></View>
      </ScrollView>

      <Pressable style={styles.submit} onPress={_submit}>
          <Text style={styles.submitText}>ویرایش</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submit: {
    width: '100%',
    height: 50,
    backgroundColor: color.code1,
    alignSelf: 'flex-start',
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

export default connect(mapStateToProps)(Profile);