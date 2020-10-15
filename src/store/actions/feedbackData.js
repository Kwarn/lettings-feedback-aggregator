import * as actionTypes from './actionTypes'

export const postFeedbackData = newFbDataEntry => {
  return {
    type: actionTypes.POST_FEEDBACK_DATA,
    newFbDataEntry,
  }
}

export const postFeedbackDataSuccess = () => {
  return {
    type: actionTypes.POST_FEEDBACK_DATA_SUCCESS,
  }
}

export const postFeedbackDataFailed = error => {
  return {
    type: actionTypes.POST_FEEDBACK_DATA_FAILED,
    error,
  }
}

export const fetchFeedbackData = () => {
  return {
    type: actionTypes.FETCH_FEEDBACK_DATA,
  }
}

export const fetchFeedbackDataSuccess = fbData => {
  return {
    type: actionTypes.FETCH_FEEDBACK_DATA_SUCCESS,
    fbData,
  }
}

export const fetchFeedbackDataFailed = error => {
  return {
    type: actionTypes.FETCH_FEEDBACK_DATA_FAILED,
    error,
  }
}
