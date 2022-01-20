import React from 'react';
import { View, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Text from '../../../components/Text';
import categories from '../../../assets/categories';
import toCurrency from '../../../utils/toCurrency';
import { showEditBudget } from '../../../redux/controller/controller.action';
import color from '../../../vars/color';
import colors from '../../../vars/color';
const width = Dimensions.get('window').width;

function BudgetingTile(props) {
  const { Title, MaxWithdrawal, Balance, Category, BudgetID } = props.data;

  const _showAddBudget = () => {
    props.showEditBudget({
      Title, Category, MaxWithdrawal, BudgetID
    });
  }


  if (MaxWithdrawal) {
    return (
      <View style={[styles.container, {borderColor: Balance > 0  ? '#e2e2e2' : '#ff9999'}]}>
        <View style={styles.row}>
          <View style={[styles.iconCircle, { borderColor: categories[Category].color }]}>
            <Image
              source={categories[Category].icon}
              style={{ tintColor: categories[Category].color, width: '60%', height: '60%' }}
            />
          </View>
          <Text style={[styles.title, { color: categories[Category].color }]}>
            {categories[Category].label} ({Title})
          </Text>
  
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#777777' }}>{toCurrency(MaxWithdrawal)}</Text>
            <Text style={{ fontSize: 10, color: '#999999' }}>سقف برداشت :‌ </Text>
          </View>
        </View>
  
        <View style={styles.row}>
          <View style={styles.progressContainer}>
            <View
              style={{
                height: '100%',
                width: Balance > 0 ? `${(Balance / MaxWithdrawal) * 100}%` :  0,
                backgroundColor: categories[Category].color
              }}>
            </View>
          </View>
        </View>
  
        
        <View style={styles.row}>
          <Text style={{ fontSize: 10, color: '#999999' }}>موجودی :‌</Text>
          <Text style={{ fontSize: 14, color: colors.code1 }}>{toCurrency(Balance)}</Text>
  
          <View style={{flex: 1}}>
            <Pressable style={styles.editButton} onPress={_showAddBudget}>
              <Text style={{color: '#1f3f60', marginRight: 10}}>ویرایش</Text>
              <Image 
                source={require('../../../assets/pen.png')}
                style={{ width: 13, height: 13, tintColor: '#1f3f60' }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  } else {
    return null
  }

  
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    backgroundColor: '#ffffff',
    elevation: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginTop: 15,
    overflow: 'hidden',
    padding: 15
  },
  row: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    marginRight: 15
  },
  progressContainer: {
    width: '100%',
    height: 10,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});


const mapDispatchToProps = dispatch => ({
  showEditBudget: data => dispatch(showEditBudget(data))
})

export default connect(null, mapDispatchToProps)(BudgetingTile);