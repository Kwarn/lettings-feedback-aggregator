import * as actionTypes from './actionTypes'

export const putPendingSalesTallyData = updatedPendingSalesTallyData => {
  return {
    type: actionTypes.PUT_PENDING_SALES_TALLY_DATA,
    updatedPendingSalesTallyData,
  }
}

export const putPendingSalesTallyDataSuccess = updatedPendingSalesTallyData => {
  return {
    type: actionTypes.PUT_PENDING_SALES_TALLY_DATA_SUCCESS,
    updatedPendingSalesTallyData,
  }
}

export const putPendingSalesTallyDataFailed = () => {
  return {
    type: actionTypes.PUT_PENDING_SALES_TALLY_DATA_FAILED,
  }
}

export const fetchPendingSalesTallyData = () => {
  return {
    type: actionTypes.FETCH_PENDING_SALES_TALLY_DATA,
  }
}

export const fetchPendingSalesTallyDataSuccess = tallyData => {
  return {
    type: actionTypes.FETCH_PENDING_SALES_TALLY_DATA_SUCCESS,
    tallyData,
  }
}

export const fetchPendingSalesTallyDataFailed = error => {
  return {
    type: actionTypes.FETCH_PENDING_SALES_TALLY_DATA_FAILED,
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
