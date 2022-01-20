import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Text from '../../../components/Text';
const width = Dimensions.get('window').width;
import dk, { dates } from '../../../vars/date';
import { Month } from '../../../vars/month'
import toCurrency from '../../../utils/toCurrency';
import sqlite from '../../../utils/sqlite';
import JDate from 'jalali-date';
import colors from '../../../vars/color';

const sh = (width * 0.75) - 135;


function SlideC () {
  const [ income, setIncome ] = useState(0);
  const [ cost, setCost ] = useState(0);
  const [ current, setCurrent ] = useState(null);
  const [ oneBefore, setOneBefore ] = useState(null);
  const [ twoBefore, setTwoBefore ] = useState(null);
  const [ costIncomeArray,  setCostIncomeArray ] = useState();
  const [ chartSideValues, setChartSideValues ] = useState();

  useEffect(() => {
    const currentM = new JDate(new Date()).date[1];
    const currentY = new JDate(new Date()).date[0];
    setCurrent({ month: currentM, year: currentY });
    
    if(currentM > 2) {
      setOneBefore({ month: currentM - 1, year: currentY });
      setTwoBefore({ month: currentM - 2, year: currentY });
    } else if (currentM > 1 && currentM < 3) {
      setOneBefore({ month: currentM - 1, year: currentY });
      setTwoBefore({ month: 12, year: currentY - 1 });
    } else {
      setOneBefore({ month: 12, year: currentY - 1 });
      setTwoBefore({ month: 11, year: currentY - 1 });
    }
  }, []);

  useEffect(() => {
    if (current && oneBefore && twoBefore) {
      costIncomeCalculator(1000 * 3600 * 24 * 90);
    }
  } , [current, oneBefore, twoBefore]);

  useEffect(() => {
    if (costIncomeArray) {
      const maxCost = Math.max.apply(Math, costIncomeArray.map(e => { return e.cost; }));
      const maxIncome = Math.max.apply(Math, costIncomeArray.map(e => { return e.income; }));
      const maximum = Math.max(maxCost, maxIncome);
      const maxStirng = maximum.toString();
      const stringLength = maxStirng.length;
      const baseNumber = parseInt(maxStirng.slice(0, -stringLength+1)) + 1;
      const chartMaxValue = baseNumber * (Math.pow(10, stringLength - 1));
      const incrementer = +(chartMaxValue/6).toString().slice(0, 1) * Math.pow(10, stringLength - 2);
      const chartValues = [chartMaxValue];
      let memory = chartMaxValue;
      for (let i = 0; i < 5; i++) {
        const value = memory - incrementer;
        chartValues.push(value);
        memory = value;
      }
      chartValues.push(0);
      setChartSideValues(chartValues);
    }
  }, [costIncomeArray])

  async function costIncomeCalculator(n) {
    const res = await sqlite(`SELECT * FROM transactions WHERE DateTime >= ${Date.now() - n}`);
    const arr = [];
    for(let i = 0; res.rows.length> i; i++) {
      const item = res.rows.item(i);
      arr.push(item)
    }
    const currentMonthTransactions = arr.filter(ts => {
      const month = new JDate(new Date(ts.DateTime)).date[1];
      return month === current.month
    });


    const oneMonthBeforeCurrentTransactions = arr.filter(ts => {
      const month = new JDate(new Date(ts.DateTime)).date[1];
      return month === oneBefore.month
    });

    const twoMonthBeforeCurrentTransactions = arr.filter(ts => {
      const month = new JDate(new Date(ts.DateTime)).date[1];
      return month === twoBefore.month
    });


    const a = {
      income: 0,
      cost: 0
    }

    const b = {
      income: 0,
      cost: 0
    }

    const c = {
      income: 0,
      cost: 0
    }

    currentMonthTransactions.forEach(ts => {
      if (ts.Type === 'cost') {
        a.cost = a.cost + ts.Amount
      } else {
        a.income = a.income + ts.Amount
      }
    });
    //rial to toman
    a.cost = a.cost > 10 ? parseInt(a.cost.toString().slice(0, -1)) : 0;
    a.income = a.income > 10 ? parseInt(a.income.toString().slice(0, -1)) : 0;

    oneMonthBeforeCurrentTransactions.forEach(ts => {
      if (ts.Type === 'cost') {
        b.cost = b.cost + ts.Amount
      } else {
        b.income = b.income + ts.Amount
      }
    });
    b.cost = b.cost > 10 ? parseInt(b.cost.toString().slice(0, -1)) : 0;
    b.income = b.income > 10 ? parseInt(b.income.toString().slice(0, -1)) : 0;

    twoMonthBeforeCurrentTransactions.forEach(ts => {
      if (ts.Type === 'cost') {
        c.cost = c.cost + ts.Amount
      } else {
        c.income = c.income + ts.Amount
      }
    });
    c.cost = c.cost > 10 ? parseInt(c.cost.toString().slice(0, -1)) : 0;
    c.income = c.income > 10 ? parseInt(c.income.toString().slice(0, -1)) : 0; 

    setCostIncomeArray([a, b, c]);
  }

  if (costIncomeArray && chartSideValues) {
    return (
      <View style={styles.slide} key="c">
      <View style={{height: '100%', width: '90%'}}>
        <View style={styles.top}>
          <Text style={{color: colors.code1}}>نمودار هزینه و درآمد</Text>
          <View style={styles.guideContainer}>
            <View style={[styles.gudieDot, {backgroundColor: colors.code4}]}></View>
            <Text style={{marginLeft: 5, fontSize: 10, color: '#777777'}}>درآمد</Text>

            <View style={{width: 20}}></View>

            <View style={[styles.gudieDot, {backgroundColor: colors.code3}]}></View>
            <Text style={{marginLeft: 5, fontSize: 10, color: '#777777'}}>هزینه</Text>
          </View>
        </View>
        
        <View style={styles.bottom}>
          <View style={styles.left}>
            {chartSideValues.map((value, index) => (
              <View style={styles.sideValueContainer} key={index.toString()}>
                <Text style={styles.sideValue}>{toCurrency(value)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.right}>
            <View style={styles.barsContainer}>
              <View style={styles.barContainer}>
                <Text style={styles.barLabel}>{toCurrency(costIncomeArray[2].income)}</Text>
                <View style={[styles.incomeBar, {height: costIncomeArray[2].income * sh / chartSideValues[0]}]}></View>
              </View>
              
              <View style={styles.barContainer}>
                <Text style={styles.barLabel}>{toCurrency(costIncomeArray[2].cost)}</Text>
                <View style={[styles.costBar, {height: costIncomeArray[2].cost * sh / chartSideValues[0]}]}></View>
              </View>
            </View>

            <View style={styles.barsContainer}>
              <View style={styles.barContainer}>
                <Text style={styles.barLabel}>{toCurrency(costIncomeArray[1].income)}</Text>
                <View style={[styles.incomeBar, {height: costIncomeArray[1].income * sh / chartSideValues[0]}]}></View>
              </View>
              
              <View style={styles.barContainer}>
                <Text style={styles.barLabel}>{toCurrency(costIncomeArray[1].cost)}</Text>
                <View style={[styles.costBar, {height: costIncomeArray[1].cost * sh / chartSideValues[0]}]}></View>
              </View>
            </View>
            
            <View style={styles.barsContainer}>
              <View style={styles.barContainer}>
                <Text style={styles.barLabel}>{toCurrency(costIncomeArray[0].income)}</Text>
                <View style={[styles.incomeBar, {height: costIncomeArray[0].income * sh / chartSideValues[0]}]}></View>
              </View>
              
              <View style={styles.barContainer}>
                <Text style={styles.barLabel}>{toCurrency(costIncomeArray[0].cost)}</Text>
                <View style={[styles.costBar, {height: costIncomeArray[0].cost * sh / chartSideValues[0]}]}></View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <View style={{flex: 0.75}}></View>

          <View style={{flex:3, flexDirection: 'row'}}>
            <View style={styles.dateSeprator}>
              <Text style={styles.sepFont}>{`${Month[twoBefore.month - 1]} ${current.year}`}</Text>
            </View>
            <View style={styles.dateSeprator}>
              <Text style={styles.sepFont}>{`${Month[oneBefore.month - 1]} ${current.year}`}</Text>
            </View>
            <View style={styles.dateSeprator}>
              <Text style={styles.sepFont}>{`${Month[current.month - 1]} ${current.year}`}</Text>
            </View>
          </View>
        </View>
      </View>
      </View>
    )
  } else {
    return (
      <View style={styles.slide} key="c">
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  top: {
    width: '100%',
    height: 40,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  guideContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  gudieDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    borderRightWidth: 2,
    borderColor: '#e2e2e2',
  },
  right: {
    flex: 4,
    borderBottomWidth: 2,
    borderColor: '#e2e2e2',
    flexDirection: 'row',
  },
  barsContainer: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  costBar: {
    backgroundColor: colors.code3,
    width: '80%',
    height: 80
  },
  incomeBar: {
    backgroundColor: colors.code4,
    width: '80%',
    height: 100
  },
  barLabel: {
    fontSize: width * 0.014,
    marginBottom: 2
  },
  dateContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row'
  },
  dateSeprator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sepFont: {
    color: '#999999',
    fontSize: 8
  },
  sideValueContainer: {
    flex: 1,
    marginRight: 5,
    justifyContent: 'flex-end',
  },
  sideValue: {
    color: '#999999', 
    textAlign: 'right',
    fontSize: width * 0.025
  }
})

export default SlideC;