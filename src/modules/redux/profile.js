export const SET_PROFILE = 'profile/SET_PROFILE'
export const CLEAR_PROFILE = 'profile/CLEAR_PROFILE'
export const UPDATE_PROFILE_DICTIONARY = 'profile/UPDATE_PROFILE_DICTIONARY'
export const ADD_PROFILE_DICTIONARY_WORD = 'profile/ADD_PROFILE_DICTIONARY_WORD'

const initialState = {
  dictionary: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_PROFILE:
      return action.newProfile

    case CLEAR_PROFILE:
      return {}

    case UPDATE_PROFILE_DICTIONARY:
      const newState = Object.assign({}, state)
      state.dictionary = action.newDictionary
      return newState

    case ADD_PROFILE_DICTIONARY_WORD:
      // only adds if not already in the array
      const newProfileState = Object.assign({}, state)
      if (newProfileState.dictionary.indexOf(action.newDictionaryWord) === -1) {
        newProfileState.dictionary.push(action.newDictionaryWord)
      }
      return newProfileState

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

export const addProfileDictionaryWord = (newDictionaryWord) => {
  return dispatch => {
    dispatch({
      type: ADD_PROFILE_DICTIONARY_WORD,
      newDictionaryWord
    })
  }
}

export const updateProfileDictionary = (newDictionary) => {
  return dispatch => {
    dispatch({
      type: UPDATE_PROFILE_DICTIONARY,
      newDictionary
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
