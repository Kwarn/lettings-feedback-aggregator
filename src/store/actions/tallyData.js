import * as actionTypes from './actionTypes'

export const putTallyData = updatedTallyData => {
  return {
    type: actionTypes.PUT_TALLY_DATA,
    updatedTallyData,
  }
}

export const putTallyDataSuccess = updatedTallyData => {
  return {
    type: actionTypes.PUT_TALLY_DATA_SUCCESS,
    updatedTallyData,
  }
}

export const putTallyDataFailed = () => {
  return {
    type: actionTypes.PUT_TALLY_DATA_FAILED,
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

export const mapReasonsToLocation = (fbData, location) => {
  return {
    type: actionTypes.MAP_REASONS_TO_LOCATION,
    fbData,
    location,
  }
}
