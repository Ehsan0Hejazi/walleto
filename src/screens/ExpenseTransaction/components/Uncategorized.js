import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getUnCategorizedExpensesAsync } from '../../../redux/user/user.action';
import { setCurrentTopTab } from '../../../redux/controller/controller.action';
import { TopTabs } from '../../../vars/topTabs';
import Text from '../../../components/Text';
import ExpenseTile from './ExpenseTile';

function Categorized(props) {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    props.getUnCategorizedExpensesAsync();

    props.navigation.addListener('focus', () => {
      props.setCurrentTopTab(TopTabs.COST_UNCAT);
    });
  }, []);

  useEffect(() => {
    setData(props.unCatExpenses);
  }, [props.unCatExpenses]);

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
  unCatExpenses: state.user.unCatExpenses,
});

const mapDispatchToProps = dispatch => ({
  getUnCategorizedExpensesAsync: () => dispatch(getUnCategorizedExpensesAsync()),
  setCurrentTopTab: value => dispatch(setCurrentTopTab(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categorized);