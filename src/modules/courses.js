export const SET_COURSES = 'course/SET_COURSES'
export const CLEAR_COURSES = 'course/CLEAR_COURSES'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_COURSES:
      return action.newCourses

    case CLEAR_COURSES:
      return []

    default:
      return state
  }
}

export const setCourses = (newCourses) => {
  return dispatch => {
    dispatch({
      type: SET_COURSES,
      newCourses
    })
  }
}

export const clearCourses = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_COURSES
    })
  }
}
