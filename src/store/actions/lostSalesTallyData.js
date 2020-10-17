import * as actionTypes from './actionTypes'

export const putLostSalesTallyData = updatedLostSalesTallyData => {
  return {
    type: actionTypes.PUT_LOST_SALES_TALLY_DATA,
    updatedLostSalesTallyData,
  }
}

export const putLostSalesTallyDataSuccess = updatedLostSalesTallyData => {
  return {
    type: actionTypes.PUT_LOST_SALES_TALLY_DATA_SUCCESS,
    updatedLostSalesTallyData,
  }
}

export const putLostSalesTallyDataFailed = () => {
  return {
    type: actionTypes.PUT_LOST_SALES_TALLY_DATA_FAILED,
  }
}

export const fetchLostSalesTallyData = () => {
  return {
    type: actionTypes.FETCH_LOST_SALES_TALLY_DATA,
  }
}

export const fetchLostSalesTallyDataSuccess = tallyData => {
  return {
    type: actionTypes.FETCH_LOST_SALES_TALLY_DATA_SUCCESS,
    tallyData,
  }
}

export const fetchLostSalesTallyDataFailed = error => {
  return {
    type: actionTypes.FETCH_LOST_SALES_TALLY_DATA_FAILED,
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
