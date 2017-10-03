export const SET_PROFILE = 'profile/SET_PROFILE'
export const CLEAR_PROFILE = 'profile/CLEAR_PROFILE'

import { apiRequest } from '../data'

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

export const getAndSetProfileFromApi = () => {
  return dispatch => {
    apiRequest(`/profiles/me`, {}, (response, status) => {
      if (status === 200) {
        dispatch({
          type: SET_PROFILE,
          response
        })
      }
    })
  }
}

export const updateAndSetProfileFromApi = (profile) => {
  return dispatch => {
    apiRequest(`/profiles/me`, {
      method: "put",
      body: JSON.stringify({profile: profile})
    }, (response, status) => {
      if (status === 200) {
        dispatch({
          type: SET_PROFILE,
          response
        })
      }
    })
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
