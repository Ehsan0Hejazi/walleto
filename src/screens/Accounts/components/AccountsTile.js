import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
import Text from '../../../components/Text';
import banks from '../../../assets/bank';
import toCurrency from '../../../utils/toCurrency';
import { getCategorizedExpensesAsync } from '../../../redux/user/user.action';
import { setFilter } from '../../../redux/controller/controller.action';
import { connect } from 'react-redux';

function Tile({ data, onEdit, navigation, getCategorizedExpensesAsync, setFilter }) {
  const [ obj, setObj] = useState();

  useEffect(() => {
    const obj = banks.filter(e => {
      return e.name === data.BankName
    });
    setObj(obj[0]);
  }, []);

  const _details = () => {
    const filter = { account: data.BankName }
    getCategorizedExpensesAsync(filter);
    setFilter(filter)

    navigation.navigate('ExpenseTransaction');
  }

  return (
    <View style={styles.container}>

      <View style={styles.sectionB}>
        <Image 
          source={obj && obj.icon}
          style={styles.bankIcon}
        />
        <Text style={{fontSize: 10, color: '#777777'}}>{obj && obj.label}</Text>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#1f3f60', marginLeft: 8, fontSize: 12}}>{data.AccountNumber}</Text>
        </View>
      </View>
      
      <View style={styles.sectionC}>
        <Text style={{color: '#999999', fontSize: 10}}>موجودی:</Text>
        <Text style={{color: '#1f3f60', fontSize: 12, marginRight: 10}} numberOfLines={1}>
          {toCurrency(data.Balance)}
        </Text>

        <Text style={{ marginRight: 5, fontSize: 10, color: '#777777' }}>تومان</Text>
      </View>

      <View style={styles.sectionD}>
        <Pressable style={styles.sectionDButton} onPress={()=>{onEdit({AccountID :data.AccountID, Balance: data.Balance})}}>
          <Image 
            style={{width: 13, height: 13, tintColor: '#19334d', marginLeft: 13}} 
            source={require('../../../assets/pen.png')} 
          />
          <Text style={{color: '#19334d', fontSize: 10}}>ویرایش موجودی</Text>
        </Pressable>

        <View style={{borderLeftWidth: 2, borderColor: '#f2f2f2'}}></View>

        <Pressable style={styles.sectionDButton} onPress={_details}>
          <Image 
            style={{width: 13, height: 13, tintColor: '#cc3300', marginLeft: 13}} 
            source={require('../../../assets/category.png')}
          />
          <Text style={{color: '#cc3300', fontSize: 10}}>جزئیات تراکنش</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 145,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 1,
  },
  sectionA: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  sectionB: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  sectionC: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 15,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  sectionD: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
    backgroundColor: '#fafafa',
    flexDirection: 'row',
  },
  sectionDButton: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIconCircle: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
  },
  catIcon: {
    width: 15, 
    height: 15
  },
  bankIcon: {
    width: 20,
    height: 28,
    marginLeft: 10,
    marginRight: 5
  }
})


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  getCategorizedExpensesAsync: filter => dispatch(getCategorizedExpensesAsync(filter)),
  setFilter: filter => dispatch(setFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tile);