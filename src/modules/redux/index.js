import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import course from './course'
import courses from './courses'
import challenge from './challenge'
import profile from './profile'
import feedback from './feedback'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  course,
  courses,
  challenge,
  profile,
  feedback
})
