// combine the reducer all into this file by import combinreducer
import {combineReducers} from 'redux'
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user:userReducer
})


export default rootReducer;