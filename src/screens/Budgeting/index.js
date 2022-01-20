import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import FloatAddButton from '../../components/FloatAddButton';
import Text from '../../components/Text';

import BudgetingHeader from './components/BudgetingHeader';
import BudgetingTile from './components/BudgetingTile';

import { showAddBudget } from '../../redux/controller/controller.action';
import { getBudgetsAsync } from '../../redux/user/user.action';

function Budgeting(props) {
  const { budgets } = props;

  useEffect(() => {
    props.getBudgetsAsync();
  }, []);

  const _showAddBudget = () => {
    props.showAddBudget({});
  }

  return (
    <View style={{flex: 1}}>
      <BudgetingHeader navigation={ props.navigation } />
      
      {budgets.length !== 0 ?
        <FlatList
          style={styles.container}
          keyExtractor={(item, index) => index.toString()}
          data={budgets}
          renderItem={({ item }) => <BudgetingTile data={item} />}
          ListFooterComponent={<View style={{ height: 80 }}></View>}
        /> 
        :
        <View style={styles.addContainer}>
          <Text style={{ color: '#999999', fontSize: 12 }}>
            هیچ بودجه ای ثبت نشده
          </Text>
        </View>
      }

      <FloatAddButton title="افزودن بودجه" onPress={_showAddBudget}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  addContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  budgets: state.user.budgets,
});

const mapDispatchToProps = dispatch => ({
  showAddBudget: data => dispatch(showAddBudget(data)),
  getBudgetsAsync: () => dispatch(getBudgetsAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(Budgeting);