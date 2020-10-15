import * as actionTypes from './actionTypes'

export const postTallyData = updatedTallyData => {
  return {
    type: actionTypes.POST_TALLY_DATA,
    updatedTallyData,
  }
}

export const postTallyDataSuccess = () => {
  return {
    type: actionTypes.POST_TALLY_DATA_SUCCESS,
  }
}

export const postTallyDataFailed = () => {
  return {
    type: actionTypes.POST_TALLY_DATA_FAILED,
  }
}

export const fetchTallyData = () => {
  return {
    type: actionTypes.FETCH_TALLY_DATA,
  }
}

export const fetchTallyDataSuccess = tallyData => {
  return {
    type: actionTypes.FETCH_TALLY_DATA_SUCCESS,
    tallyData,
  }
}

export const fetchTallyDataFailed = error => {
  return {
    type: actionTypes.FETCH_TALLY_DATA_FAILED,
    error,
  }
}
