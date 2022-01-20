import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Categorized from './Categorized';
import Uncategorized from './Uncategorized';

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
    return (
      <Tab.Navigator 
        tabBarOptions={{
          style: {
            backgroundColor: '#19334d'
          },
          labelStyle: {
            fontFamily: 'IRANYekanRegular'
          },
          activeTintColor: '#ffffff',
          indicatorStyle: {
            backgroundColor: 'white',
            height: 3,
          },
        }}
        initialRouteName="Categorized"
        lazy={true}
      >
        <Tab.Screen name="Uncategorized" component={Uncategorized} options={{tabBarLabel: 'دسته بندی نشده'}} />
        <Tab.Screen name="Categorized" component={Categorized} options={{tabBarLabel: 'دسته بندی شده'}} />
      </Tab.Navigator>
    )
  }