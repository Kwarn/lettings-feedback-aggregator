import * as actionTypes from './actionTypes'

export const putSalesTallyData = (
  dataGroupIdentifier,
  updatedSalesTallyData
) => {
  return {
    type: actionTypes.PUT_SALES_TALLY_DATA,
    payload: {
      dataGroupIdentifier,
      updatedSalesTallyData,
    },
  }
}

export const putSalesTallyDataSuccess = (
  dataGroupIdentifier,
  updatedSalesTallyData
) => {
  return {
    type: actionTypes.PUT_SALES_TALLY_DATA_SUCCESS,
    payload: {
      dataGroupIdentifier,
      updatedSalesTallyData,
    },
  }
}

export const putSalesTallyDataFailed = dataGroupIdentifier => {
  return {
    type: actionTypes.PUT_SALES_TALLY_DATA_FAILED,
    payload: { dataGroupIdentifier },
  }
}

export const fetchSalesTallyData = dataGroupIdentifier => {
  return {
    type: actionTypes.FETCH_SALES_TALLY_DATA,
    payload: { dataGroupIdentifier },
  }
}

export const fetchSalesTallyDataSuccess = (
  dataGroupIdentifier,
  salesTallyData
) => {
  return {
    type: actionTypes.FETCH_SALES_TALLY_DATA_SUCCESS,
    payload: {
      dataGroupIdentifier,
      salesTallyData,
    },
  }
}

export const fetchSalesTallyDataFailed = (dataGroupIdentifier, error) => {
  return {
    type: actionTypes.FETCH_SALES_TALLY_DATA_FAILED,
    payload: { dataGroupIdentifier, error },
  }
}

export const mapReasonsToLocation = (salesData, location) => {
  return {
    type: actionTypes.MAP_REASONS_TO_LOCATION,
    payload: {
      salesData,
      location,
    },
  }
}
