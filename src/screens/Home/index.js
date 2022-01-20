import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Pressable, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
import Text from '../../components/Text';
import Slider from '../../components/Slider';
import dk, {dates} from '../../vars/date';
import colors from '../../vars/color';
import HomeHeader from './components/HomeHeader';
import DropDownMenu from './components/DropDownMenu';
import DropDownList from './components/DropDownList';
import HomeTile from './components/HomeTile';
import SlideA from './components/SlideA';
import SlideB from './components/SlideB';
import SlideC from './components/SlideC';
import { showAddTransaction } from '../../redux/controller/controller.action';
import { getAllTransactionsAsync, setPeriodGlob } from '../../redux/user/user.action';

function Home({ navigation, accounts, allTransactions, showAddTransaction, getAllTransactionsAsync, _period }) {
  const [period, setPeriod] = useState('DAY');

  useEffect(() => {
    getAllTransactionsAsync();
  }, []);

  const _addFirst = () => {
    if (accounts.length > 0) {
      showAddTransaction({
        type: 'COST'
      })
    } else {
      ToastAndroid.show('هیچ حسابی جهت ثبت تراکنش یافت نشد', ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />

      <ScrollView>
        <View style={{ padding: 20, paddingTop: 30 }}>
          <DropDownMenu options={dk} onChange={(val) => { 
            setPeriod(val);
            _period(val);
          }} />
        </View>

        <View style={styles.sliderContainer}>
          <Slider>
            <SlideA period={period} />
            <SlideB />
            {/* <SlideC /> */}
          </Slider>
        </View>

        <View style={{ padding: 20 }}>
          <DropDownList options={accounts} />

          <Text style={{ fontSize: 12, marginTop: 25, marginRight: 3, color: '#1f3f60' }}>
            آخرین تراکنش ها
          </Text>

          {allTransactions.length === 0 ?
            <View style={styles.noTransactionContainer}>
              <Text style={{ color: '#999999' }}>هیج تراکنشي ثبت نشده</Text>
              <Pressable style={styles.firstTransactionBut} onPress={_addFirst}>
                <Text style={{ color: '#ffffff', fontSize: 10 }}>ثبت اولین تراکنش</Text>
              </Pressable>
            </View>
            :
            allTransactions.map((data, i) => <HomeTile key={data.HandyID.toString()} data={data} />)
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    width: '100%',
    aspectRatio: 1.5
  },
  slide: {
    width: width,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  noTransactionContainer: {
    width: '100%',
    height: 120,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#e2e2e2',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstTransactionBut: {
    backgroundColor: colors.code1,
    padding: 10,
    borderRadius: 5,
    marginTop: 15
  }
});

const mapStateToProps = state => ({
  accounts: state.user.accounts,
  allTransactions: state.user.allTransactions,
});

const mapDispatchToProps = dispatch => ({
  showAddTransaction: data => dispatch(showAddTransaction(data)),
  getAllTransactionsAsync: () => dispatch(getAllTransactionsAsync()),
  _period: value => dispatch(setPeriodGlob(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);