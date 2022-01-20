import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import HomeButton from './components/HomeButton';
import Icon from './components/Icon';

import Login from '../screens/Login';
import Confirm from '../screens/Confirm';

import Home from '../screens/Home';
import Accounts from '../screens/Accounts';
import IncomeTransaction from '../screens/IncomeTransaction';
import ExpenseTransaction from '../screens/ExpenseTransaction';
import Budgeting from '../screens/Budgeting';

import Profile from '../screens/Profile';
import Splash from '../screens/Splash';

enableScreens();

function Tabs() {
  return (
    <Tab.Navigator 
      tabBarOptions={{ 
        activeTintColor: '#e06d5f', 
        inactiveTintColor:'#19334d', 
        labelStyle: {fontFamily: 'IRANYekanRegular', fontSize: 8, marginBottom: 4},
      }} 
      initialRouteName="Home"
    >
      <Tab.Screen name="Accounts" component={Accounts} 
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name="a" />,
          tabBarLabel: 'حساب ها',
        }}
      />

      <Tab.Screen name="IncomeTransaction" component={IncomeTransaction} 
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name="b" />,
          tabBarLabel: 'تراکنش درآمد',
        }}
      />

      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => <HomeButton focused={focused} />,
        }}
      />

      <Tab.Screen name="ExpenseTransaction" component={ExpenseTransaction} 
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name="c" />,
          tabBarLabel: 'تراکنش هزینه',
        }}
      />

      <Tab.Screen name="Budgeting" component={Budgeting} 
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name="d" />,
          tabBarLabel: 'بودجه بندی',
        }}
      />
    </Tab.Navigator>
  )
}


function Container() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Confirm" component={Confirm} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Container;