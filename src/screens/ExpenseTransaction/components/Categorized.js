import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getCategorizedExpensesAsync } from '../../../redux/user/user.action';
import { setCurrentTopTab } from '../../../redux/controller/controller.action';
import { TopTabs } from '../../../vars/topTabs';
import Text from '../../../components/Text';
import ExpenseTile from './ExpenseTile';

function Categorized(props) {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    if (props.catExpenses.length < 0) {
      props.getCategorizedExpensesAsync();
    }

    props.navigation.addListener('focus', () => {
      props.setCurrentTopTab(TopTabs.COST_CAT);
    });
  }, []);

  useEffect(() => {
    setData(props.catExpenses);
  }, [props.catExpenses])

  if (data.length !== 0) {
    return (
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={item => item.HandyID.toString()}
        renderItem={({ item }) => <ExpenseTile data={item} />}
        ListFooterComponent={<View style={{ height: 70 }}></View>}
      />
    )
  } else {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{color: '#999999'}}>هیچ تراکنشی یافت نشد</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  catExpenses: state.user.catExpenses,
  currentTopTab: state.controller.currentTopTab
});

const mapDispatchToProps = dispatch => ({
  getCategorizedExpensesAsync: () => dispatch(getCategorizedExpensesAsync()),
  setCurrentTopTab: value => dispatch(setCurrentTopTab(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categorized);