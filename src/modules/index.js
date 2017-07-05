import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import course from './course'
import courses from './courses'
import challenge from './challenge'

export default combineReducers({
  routing: routerReducer,
  counter,
  course,
  courses,
  challenge
})
