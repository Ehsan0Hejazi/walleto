import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../../../components/Text';
import { getBank } from '../../../assets/bank';
import toCurrency from '../../../utils/toCurrency';
import categories from '../../../assets/categories';
import date from '../../../vars/date';
import JDate from 'jalali-date';
import colors from '../../../vars/color'

function Tile({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.unitA}>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: 15, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 10, color: '#777777' }}>
                تومان
              </Text>

              <Text style={{ color: data.Type === 'COST' ? '#cc3300' : colors.code1, marginLeft: 10, fontSize: 14 }}>
                {data.Type === 'COST' ? '-' : '+'}{toCurrency(data.Amount)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ color: categories[data.Category].color, fontSize: 12 }}>
                {categories[data.Category].label}
              </Text>
            </View>
          </View>

          <View style={[styles.iconCircle, { borderColor: categories[data.Category].color }]}>
            <Image
              source={categories[data.Category].icon}
              style={{ width: 17, height: 17, tintColor: categories[data.Category].color }}
            />
          </View>
        </View>

        <View style={{ flex: 1, paddingRight: 45 }}>
          <Text style={{ fontSize: 9, color: '#999999' }} numberOfLines={1} >{data.Description}</Text>
        </View>
      </View>

      <View style={styles.unitB}>
        <View style={{ flex: 1, padding: 5, flexDirection: 'row' }}>
          <View style={{ flex: 1.5 }}>
            <Text style={{ color: '#999999', textAlign: 'left', fontSize: 10 }}>
              {new JDate(new Date(data.DateTime)).format('dddd DD MMMM YYYY')}
            </Text>
          </View>

          <View style={{ flex: 2 }}>
            <Text style={{ color: '#999999', textAlign: 'right', fontSize: 10 }}>{getBank(data.BankName).label}</Text>
          </View>
        </View>

        <Image source={getBank(data.BankName).icon} style={styles.bankIcon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
    overflow: 'hidden'
  },
  unitA: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  unitB: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20
  },
  bankIcon: {
    width: 18,
    height: 22,
    marginLeft: 10,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Tile;