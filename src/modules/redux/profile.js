export const SET_PROFILE = 'profile/SET_PROFILE'
export const CLEAR_PROFILE = 'profile/CLEAR_PROFILE'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_PROFILE:
      return action.newProfile

    case CLEAR_PROFILE:
      return {}

    default:
      return state
  }
}

export const setProfile = (newProfile) => {
  return dispatch => {
    dispatch({
      type: SET_PROFILE,
      newProfile
    })
  }
}

export const clearProfile = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_PROFILE
    })
  }
}
