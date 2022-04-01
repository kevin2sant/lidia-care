import { combineReducers } from 'redux'

import loginReducer from './loginReducer'
import snackReducer from './snackBarReducer'

export default combineReducers({
    login : loginReducer,
    snackBar : snackReducer
})