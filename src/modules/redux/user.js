export const SET_USER = 'user/SET_USER'
export const CLEAR_USER = 'user/CLEAR_USER'
export const SET_JWT= 'user/SET_JWT'
export const SET_CURRENT_USER= 'user/SET_CURRENT_USER'
export const SET_ANONYMOUS_USER= 'user/SET_ANONYMOUS_USER'

const initialState = {
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_USER:
      return action.newUser

    case SET_CURRENT_USER:
      return Object.assign({}, state, action.currentUser)

    case SET_JWT:
      return Object.assign({}, state, {jwt: action.jwt})

    case SET_ANONYMOUS_USER:
      return Object.assign({}, state, {anonymous_user_id: action.anonymousUserId})

    case CLEAR_USER:
      return {}

    default:
      return state
  }
}

export const setAnonymousUser = (anonymousUserId) => {
  return dispatch => {
    dispatch({
      type: SET_ANONYMOUS_USER,
      anonymousUserId
    })
  }
}

export const setUser = (newUser) => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      newUser
    })
  }
}

export const setCurrentUser = (currentUser) => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT_USER,
      currentUser
    })
  }
}

export const setJwt = (jwt) => {
  return dispatch => {
    dispatch({
      type: SET_JWT,
      jwt
    })
  }
}

export const clearUser = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_USER
    })
  }
}
