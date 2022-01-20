import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import controllerReducer from './controller/controller.reducer';

export default combineReducers({
    user: userReducer,
    controller: controllerReducer
})