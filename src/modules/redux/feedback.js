export const SET_FEEDBACK = 'feedback/SET_FEEDBACK'
export const SET_FEEDBACK_CONTEXT = 'feedback/SET_FEEDBACK_CONTEXT'
export const CLEAR_FEEDBACK = 'feedback/CLEAR_FEEDBACK'
export const SET_FEEDBACK_MODAL = 'feedback/SET_FEEDBACK_MODAL'
export const SET_FEEDBACK_MESSAGING = 'feedback/SET_FEEDBACK_MESSAGING'

const initialState = {
  modal: false,
  messaging: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_FEEDBACK_CONTEXT:
      return Object.assign({}, state, {context: action.newFeedbackContext})

    case SET_FEEDBACK_MODAL:
      return Object.assign({}, state, {modal: action.newFeedbackModal})

    case SET_FEEDBACK_MESSAGING:
      return Object.assign({}, state, {messaging: action.newFeedbackMessaging})

    case SET_FEEDBACK:
      return action.newFeedback

    case CLEAR_FEEDBACK:
      return {}

    default:
      return state
  }
}

export const setFeedbackContext = (newFeedbackContext) => {
  return dispatch => {
    dispatch({
      type: SET_FEEDBACK_CONTEXT,
      newFeedbackContext
    })
  }
}

export const setFeedbackMessaging = (newFeedbackMessaging) => {
  return dispatch => {
    dispatch({
      type: SET_FEEDBACK_MESSAGING,
      newFeedbackMessaging
    })
  }
}

export const setFeedbackModal = (newFeedbackModal) => {
  return dispatch => {
    dispatch({
      type: SET_FEEDBACK_MODAL,
      newFeedbackModal
    })
  }
}


export const setFeedback = (newFeedback) => {
  return dispatch => {
    dispatch({
      type: SET_FEEDBACK,
      newFeedback
    })
  }
}


export const clearFeedback = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_FEEDBACK
    })
  }
}
