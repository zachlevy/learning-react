import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import course from './course'
import courses from './courses'

export default combineReducers({
  routing: routerReducer,
  counter,
  course,
  courses
})
