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

export const deleteFbDataEntries = entries => {
  return {
    type: actionTypes.DELETE_FEEDBACK_DATA_ENTRIES,
    entries,
  }
}

export const deleteFbDataEntriesSuccess = idsDeletedArr => {
  return {
    type: actionTypes.DELETE_FEEDBACK_DATA_ENTRIES_SUCCESS,
    idsDeletedArr,
  }
}

export const deleteFbDataEntriesFailed = error => {
  return {
    type: actionTypes.DELETE_FEEDBACK_DATA_ENTRIES_FAILED,
    error,
  }
}
