import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import course from './course'
import courses from './courses'
import challenge from './challenge'
import profile from './profile'
import feedback from './feedback'

export default combineReducers({
  routing: routerReducer,
  course,
  courses,
  challenge,
  profile,
  feedback
})
