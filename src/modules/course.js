export const SET_COURSE = 'course/SET_COURSE'
export const CLEAR_COURSE = 'course/CLEAR_COURSE'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_COURSE:
      return action.newCourse

    case CLEAR_COURSE:
      return {}

    default:
      return state
  }
}

export const setCourse = (newCourse) => {
  return dispatch => {
    dispatch({
      type: SET_COURSE,
      newCourse
    })
  }
}

export const clearCourse = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_COURSE
    })
  }
}
