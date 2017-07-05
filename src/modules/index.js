import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import course from './course'

export default combineReducers({
  routing: routerReducer,
  counter,
  course
})
