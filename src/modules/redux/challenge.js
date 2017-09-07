export const SET_CHALLENGE = 'challenge/SET_CHALLENGE'
export const CLEAR_CHALLENGE = 'challenge/CLEAR_CHALLENGE'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_CHALLENGE:
      return action.newChallenge

    case CLEAR_CHALLENGE:
      return {}

    default:
      return state
  }
}

export const setChallenge = (newChallenge) => {
  return dispatch => {
    dispatch({
      type: SET_CHALLENGE,
      newChallenge
    })
  }
}

export const clearChallenge = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_CHALLENGE
    })
  }
}
