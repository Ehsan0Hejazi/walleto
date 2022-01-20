import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import AddTransaction from './AddTransaction';
import EditTransaction from './EditTransaction';
import AddBudget from './AddBudget';
import EditBudget from './EditBudget';
import Filter from './Filter';
import CatBox from './CatBox';

function RootView(props) {
  if (props.rootView.visible === true && props.rootView.component === 'AddTransaction') {
    return <AddTransaction />
  } else if (props.rootView.visible === true && props.rootView.component === 'EditTransaction') {
    return <EditTransaction />
  } else if (props.rootView.visible === true && props.rootView.component === 'AddBudget') {
    return <AddBudget />
  } else if (props.rootView.visible === true && props.rootView.component === 'EditBudget') {
    return <EditBudget />
  } else  if(props.rootView.visible === true && props.rootView.component === 'Filter') {
    return <Filter />
  } else if (props.rootView.visible === true && props.rootView.component === 'CatBox') {
    return <CatBox />
  } else {
    return null
  }
}

const mapStateToProps = state => ({
  rootView: state.controller.rootView
})

export default connect(mapStateToProps, null)(RootView)


