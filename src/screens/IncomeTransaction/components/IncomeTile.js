import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
import Text from '../../../components/Text';
import { getBank } from '../../../assets/bank';
import categories from '../../../assets/categories';
import toCurrency from '../../../utils/toCurrency';
import colors from '../../../vars/color';
import { showCategoryBox, showEditTransaction } from '../../../redux/controller/controller.action';
import JDate from 'jalali-date';

function Tile(props) {
  const _editTransaction = () => {
    props.showEditTransaction({
      id: props.data.HandyID,
      type: props.data.Type,
      description: props.data.Description,
      category: props.data.Category,
      amount: props.data.Amount,
      account: props.data.BankName
    })
  }

  useEffect(() => {})
  return (
    <View style={styles.container}>
      <View style={styles.sectionA}>
        <View style={[ styles.catIconCircle, {borderColor: categories[props.data.Category].color} ]}>
          <Image 
            style={[styles.catIcon, {tintColor: categories[props.data.Category].color}]} 
            source={categories[props.data.Category].icon} 
          />
        </View>
        <Text style={{color: categories[props.data.Category].color, marginRight: 10}}>
          {categories[props.data.Category].label}
        </Text>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: width * 0.09}}>
          <Image 
            source={require('../../../assets/ua.png')}
            style={{width: 10, height: 10, marginRight: 10, tintColor: colors.code2}}
          />
          <Text style={{color: '#777777', fontSize: 10}}>درآمد</Text>
        </View>
      </View>

      <View style={styles.sectionB}>
        <Image 
          source={getBank(props.data.BankName).icon}
          style={styles.bankIcon}
        />
        <Text style={{fontSize: 10, color: '#777777'}}>{getBank(props.data.BankName).label}</Text>

        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#777777', fontSize: 10}}>تومان</Text>
          <Text style={{color: colors.code1, marginLeft: 8, fontSize: 16}}>{toCurrency(props.data.Amount)}</Text>
        </View>
      </View>
      
      <View style={styles.sectionC}>
        <View style={{width: width - 150}}>
          <Text style={{color: '#999999', fontSize: 10}} numberOfLines={1}>
            {props.data.Description}
          </Text>
        </View>

        <View style={{width: 80, flexDirection: 'row', paddingLeft: 5}}>
          {/* be ware to declare today yesterday and ... based on timestamp */}
          <Text style={{color: '#999999', fontSize: 10}}>
            {new JDate(new Date(props.data.DateTime)).format('DD MMMM')}
          </Text>
        </View>
      </View>

      <View style={styles.sectionD}>
        <Pressable style={styles.sectionDButton} onPress={_editTransaction}>
          <Image 
            style={{width: 13, height: 13, tintColor: '#19334d', marginLeft: 13}} 
            source={require('../../../assets/pen.png')} 
          />
          <Text style={{color: '#19334d', fontSize: 10}}>ویرایش</Text>
        </Pressable>

        <View style={{borderLeftWidth: 2, borderColor: '#f2f2f2'}}></View>

        <Pressable style={styles.sectionDButton} onPress={() => props.showCategoryBox({id: props.data.HandyID, prime: props.data.Category, amount: props.data.Amount})}>
          <Image 
            style={{width: 13, height: 13, tintColor: '#cc3300', marginLeft: 13}} 
            source={require('../../../assets/category.png')}
          />
          <Text style={{color: '#cc3300', fontSize: 10}}>دسته بندی</Text>
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
    width: 14,
    height: 18,
    marginLeft: 10,
    marginRight: 5
  }
})


const mapStateToProps = state => ({
  modal: state.controller.modal
});

const mapDispatchToProps = dispatch => ({
  showCategoryBox: data => dispatch(showCategoryBox(data)),
  showEditTransaction: data => dispatch(showEditTransaction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tile);