export const SET_CONTENT = 'content/SET_CONTENT'
export const CLEAR_CONTENT = 'content/CLEAR_CONTENT'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_CONTENT:
      return action.newContent

    case CLEAR_CONTENT:
      return {}

    default:
      return state
  }
}

export const setContent = (newContent) => {
  return dispatch => {
    dispatch({
      type: SET_CONTENT,
      newContent
    })
  }
}

export const clearContent = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_CONTENT
    })
  }
}
