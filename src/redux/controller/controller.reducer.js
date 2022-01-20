const INITIAL_STATE = {
  modal : {
    visible: false,
    type: '',
    initialValues: {},
    component: null
  },
  modalView: {
    visible: false,
    type: '',
    initialValues: {},
    component: null,
  },
  rootView: {
    visible: false,
    component: null,
    initialValues: {}
  },
  currentTopTab: '',
  costCatFilter: {},
  costUnCatFilter: {},
  incomeCatFilter: {},
  incomeUnCatFilter: {},
  filter: {}
}

const controllerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SHOW_ADD_TRANSACTION':
      return {
        ...state,
        rootView: action.value,
      }
    case 'SHOW_EDIT_TRANSACTION':
      return {
        ...state,
        rootView: action.value
      }
    case 'SHOW_ADD_BUDGET':
      return {
        ...state,
        rootView: action.value
      }
    case 'SHOW_EDIT_BUDGET':
      return {
        ...state,
        rootView: action.value
      }
    case 'HIDE_ROOT_VIEW':
      return {
        ...state,
        rootView: action.value
      }
    case 'SHOW_FILTER':
      return {
        ...state,
        rootView: action.value
      }
    case 'SHOW_CATEGORY_BOX':
      return {
        ...state,
        rootView: action.value
      }
    case 'SET_CURRENT_TOP_TAB':
      return {
        ...state,
        currentTopTab: action.value
      }
    case 'SET_COST_CAT_FILTER':
      return {
        ...state,
        costCatFilter: action.value,
      }
    case 'SET_COST_UNCAT_FILTER':
      return {
        ...state,
        costUnCatFilter: action.value,
      }
    case 'SET_INCOME_CAT_FILTER':
      return {
        ...state,
        incomeCatFilter: action.value,
      }
    case 'SET_INCOME_UNCAT_FILTER':
      return {
        ...state,
        incomeUnCatFilter: action.value,
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.value
      }

      
    default:
      return state
  }
}

export default controllerReducer;