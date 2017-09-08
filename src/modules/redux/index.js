import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import course from './course'
import courses from './courses'
import challenge from './challenge'
import profile from './profile'
import feedback from './feedback'

import { reducer as formReducer } from 'redux-form'
import reactDeviseReducers from 'react-devise/lib/reducers'
console.log("reactDeviseReducers", reactDeviseReducers)

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  ...reactDeviseReducers,
  course,
  courses,
  challenge,
  profile,
  feedback
})
