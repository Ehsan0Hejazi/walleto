import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Text from '../../../components/Text';
const width = Dimensions.get('window').width;
import dk, { dates } from '../../../vars/date';
import toCurrency from '../../../utils/toCurrency';
import sqlite from '../../../utils/sqlite';
import { cos } from 'react-native-reanimated';
import { getPieAsync } from '../.././../redux/user/user.action';
import { connect } from 'react-redux';

function SlideA(props) {
  const [ income, setIncome ] = useState(0);
  const [ cost, setCost ] = useState(0);

  useEffect(() => {
    props.getPieAsync(props.period);
  }, [props.period]);

  useEffect(() => {
    if (props.pie) {
      setIncome(props.pie.income || 0);
      setCost(props.pie.cost || 0);
    }
  }, [props.pie]);

  return (
    <View style={styles.slide} key="a">
      <View style={styles.circleContainer}>
        <ProgressCircle
          percent={income/(income+cost) * 100}
          radius={width * 0.15}
          borderWidth={13}
          color="#3973ac"
          shadowColor="#d9e6f2"
          bgColor="#fff"
        >
          <Text style={{ fontSize: width*0.045, color: '#777777' }}>
            درآمد
          </Text>
        </ProgressCircle>

        <Text style={styles.price}>
          {toCurrency(income)}
        </Text>
      </View>

      <View style={styles.circleContainer}>
        <ProgressCircle
          percent={cost / (cost + income) *100}
          radius={width * 0.15}
          borderWidth={13}
          color="#cc3300"
          shadowColor="#ffd9cc"
          bgColor="#fff"
        >
          <Text style={{ fontSize: width*0.045, color: '#777777' }}>
            هزینه
          </Text>
        </ProgressCircle>

        <Text style={styles.price}>
          {toCurrency(cost)}
        </Text>
      </View>

      <Text style={styles.text}>{dates[props.period]}</Text>
    
    </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center'
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    position: 'absolute',
    top: width * 0.05,
    color: '#19334d',
    fontSize: 10,
  },
  price: {
    marginTop: 20,
    fontSize: 16,
    color: '#444444',
  }
})

const mapStateToProps = state => ({
  pie: state.user.pie,
  period: state.user.period,
});

const mapDispatchToProps = dispatch => ({
  getPieAsync: n => dispatch(getPieAsync(n)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideA);