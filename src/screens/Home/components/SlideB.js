import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Pie from 'react-native-pie';
import categories from '../../../assets/categories';
import Text from '../../../components/Text';
import { getSharesAsync, getCategorizedExpensesAsync } from '../../../redux/user/user.action';
const width = Dimensions.get('window').width;
import colors from '../../../vars/color';

function SlideB({ catShares, getSharesAsync, getCategorizedExpensesAsync, catExpenses }) {
  useEffect(() => {
    getSharesAsync();
    getCategorizedExpensesAsync();
  }, []);

  if (catExpenses.length > 0) {
    return (
      <View style={styles.slide} key="b">
        <View style={styles.pieContainer}>
          <Pie
            radius={width * 0.2}
            innerRadius={width * 0.13}
            sections={catShares.map(cs => {
              return { percentage: cs.share, color: categories[cs.category].color }
            })}
            dividerSize={0}
            strokeCap={'butt'}
          />
        </View>

        <View style={styles.catContainer}>
          <Text style={{}}>
            دسته بندی هزینه ها
          </Text>

          {catShares.map(cs => {
            return <Row label={categories[cs.category].label} share={cs.share} key={cs.category} color={categories[cs.category].color} />
          })}
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.slide} key="b">
        <View style={styles.pieContainer}>
          <Pie
            radius={width * 0.2}
            innerRadius={width * 0.13}
            sections={catShares.map( cs => {
              return { percentage: cs.share, color: categories[cs.category].color}
            })}
            dividerSize={0}
            strokeCap={'butt'}
          />
        </View>
  
        <View style={styles.catContainer}>
          <Text style={{}}>
            دسته بندی هزینه ها
          </Text>
  
          {catShares.map(cs => {
            return <Row label={categories[cs.category].label} share={0} key={cs.category} color={categories[cs.category].color} />
          })}
        </View>
      </View>
    )
  }


}

function Row({ label, color, share }) {
  return (
    <View style={styles.rowContainer}>
      <View style={[styles.dot, { backgroundColor: color }]}></View>
      <Text style={{ fontSize: 10, color: '#777777' }}>{label}</Text>
      <Text style={{ marginLeft: 10, fontSize: 10, color: colors.code1 }}>({Math.round(share)}</Text>
      <Text style={{ fontSize: 10, color: colors.code1 }}>%)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: '100%',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center'
  },
  pieContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  catContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  rowContainer: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 0.14
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 15
  }
})

const mapStateToProps = state => ({
  catShares: state.user.catShares,
  catExpenses: state.user.catExpenses
});

const mapDispatchToProps = dispatch => ({
  getSharesAsync: () => dispatch(getSharesAsync()),
  getCategorizedExpensesAsync: () => dispatch(getCategorizedExpensesAsync()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SlideB);