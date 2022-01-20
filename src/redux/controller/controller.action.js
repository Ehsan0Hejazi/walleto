export const showModal = data => ({
  type: 'SHOW_MODAL',
  value: {
    visible: true,
    type: data.type,
    initialValues: data.initialValues,
    component: data.component
  }
});

export const hideModal = data => ({
  type: 'SHOW_MODAL',
  value: {
    visible: false,
    type: '',
    initialValues: {},
    component: null,
  }
});

export const showAddTransaction = data => ({
  type: 'SHOW_ADD_TRANSACTION',
  value: {
    visible: true,
    component: 'AddTransaction',
    initialValues: data
  }
});

export const showEditTransaction = data => ({
  type: 'SHOW_EDIT_TRANSACTION',
  value: {
    visible: true,
    component: 'EditTransaction',
    initialValues: data
  }
});

export const showAddBudget = data => ({
  type: 'SHOW_ADD_BUDGET',
  value: {
    visible: true,
    component: 'AddBudget',
    initialValues: data
  }
});

export const showEditBudget = data => ({
  type: 'SHOW_EDIT_BUDGET',
  value: {
    visible: true,
    component: 'EditBudget',
    initialValues: data
  }
});

export const showFilter = data => ({
  type: 'SHOW_FILTER',
  value: {
    visible: true,
    component: 'Filter',
    initialValues: data
  }
});

export const showCategoryBox = data => ({
  type: 'SHOW_CATEGORY_BOX',
  value: {
    visible: true,
    component: 'CatBox',
    initialValues: data
  }
});

export const hideRootView = data => ({
  type: 'HIDE_ROOT_VIEW',
  value: {
    visible: false,
    component: null,
  }
})

export const setCurrentTopTab = value => ({
  type: 'SET_CURRENT_TOP_TAB',
  value
})

export const setCostCatFilter = value => ({
  type: 'SET_COST_CAT_FILTER',
  value
})

export const setCostUnCatFilter = value => ({
  type: 'SET_COST_UNCAT_FILTER',
  value
})

export const setIncomeCatFilter = value => ({
  type: 'SET_INCOME_CAT_FILTER',
  value
})

export const setIncomeUnCatFilter = value => ({
  type: 'SET_INCOME_UNCAT_FILTER',
  value
})

export const setFilter = value => ({
  type: 'SET_FILTER',
  value
})