import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {authStateReducer} from "redux-auth"
import course from './course'
import courses from './courses'
import challenge from './challenge'
import profile from './profile'
import feedback from './feedback'

export default combineReducers({
  routing: routerReducer,
  auth: authStateReducer,
  course,
  courses,
  challenge,
  profile,
  feedback
})
