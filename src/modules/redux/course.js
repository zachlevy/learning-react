export const SET_COURSE = 'course/SET_COURSE'
export const CLEAR_COURSE = 'course/CLEAR_COURSE'
export const UPDATE_COURSE_FLOW_CHALLENGE = 'course/UPDATE_COURSE_FLOW_CHALLENGE'
export const INSERT_COURSE_FLOW_CHALLENGES = 'course/INSERT_COURSE_FLOW_CHALLENGES'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_COURSE:
      return action.newCourse

    case CLEAR_COURSE:
      return {}

    case UPDATE_COURSE_FLOW_CHALLENGE:
      const newState = Object.assign({}, state)
      const challengeIndex = newState.flow.findIndex((challenge) => {
        return challenge.id === action.challengeId
      })
      newState.flow[challengeIndex] = Object.assign(newState.flow[challengeIndex], {completionStatus: action.completionStatus})
      return newState

    case INSERT_COURSE_FLOW_CHALLENGES:
      const newCourseState = Object.assign({}, state)
      newCourseState.flow.splice(action.afterChallengeId, 0, ...action.challengeFlowObjects)
      return newCourseState

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

export const insertCourseFlowChallenges = (afterChallengeId, challengeFlowObjects) => {
  return dispatch => {
    dispatch({
      type: INSERT_COURSE_FLOW_CHALLENGES,
      afterChallengeId,
      challengeFlowObjects
    })
  }
}

// update the flow array
// pass in id
// pass in the challenge completion status. complete, attempt, skip
export const updateCourseFlowChallenge = (challengeId, completionStatus) => {
  return dispatch => {
    dispatch({
      type: UPDATE_COURSE_FLOW_CHALLENGE,
      challengeId,
      completionStatus
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
