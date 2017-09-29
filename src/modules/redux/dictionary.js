export const SET_DICTIONARY = 'dictionary/SET_DICTIONARY'
export const CLEAR_DICTIONARY = 'dictionary/CLEAR_DICTIONARY'
export const ADD_DICTIONARY_WORD = 'dictionary/ADD_DICTIONARY_WORD'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_DICTIONARY:
      return action.newDictionary

    case CLEAR_DICTIONARY:
      return []

    case ADD_DICTIONARY_WORD:
      // only adds if not already in the array
      const newDictionaryState = [...state]
      if (newDictionaryState.indexOf(action.newDictionaryWord) === -1) {
        newDictionaryState.push(action.newDictionaryWord)
      }
      return newDictionaryState

    default:
      return state
  }
}

export const setDictionary = (newDictionary) => {
  return dispatch => {
    dispatch({
      type: SET_DICTIONARY,
      newDictionary
    })
  }
}

export const addDictionaryWord = (newDictionaryWord) => {
  return dispatch => {
    dispatch({
      type: ADD_DICTIONARY_WORD,
      newDictionaryWord
    })
  }
}

export const clearDictionary = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_DICTIONARY
    })
  }
}
