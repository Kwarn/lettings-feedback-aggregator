import * as actionTypes from './actionTypes'

export const postSalesData = (dataGroupIdentifier, newSalesDataEntry) => {
  return {
    type: actionTypes.POST_SALES_DATA,
    payload: {
      dataGroupIdentifier,
      newSalesDataEntry,
    },
  }
}

export const postSalesDataSuccess = (
  dataGroupIdentifier,
  newSalesDataEntry
) => {
  return {
    type: actionTypes.POST_SALES_DATA_SUCCESS,
    payload: {
      dataGroupIdentifier,
      newSalesDataEntry,
    },
  }
}

export const postSalesDataFailed = (dataGroupIdentifier, error) => {
  return {
    type: actionTypes.POST_SALES_DATA_FAILED,
    payload: {
      dataGroupIdentifier,
      error,
    },
  }
}

export const fetchSalesData = dataGroupIdentifier => {
  return {
    type: actionTypes.FETCH_SALES_DATA,
    payload: { dataGroupIdentifier },
  }
}

export const fetchSalesDataSuccess = (dataGroupIdentifier, salesData) => {
  return {
    type: actionTypes.FETCH_SALES_DATA_SUCCESS,
    payload: { dataGroupIdentifier, salesData },
  }
}

export const fetchSalesDataFailed = (dataGroupIdentifier, error) => {
  return {
    type: actionTypes.FETCH_SALES_DATA_FAILED,
    payload: { dataGroupIdentifier, error },
  }
}

export const deleteSalesDataEntries = (
  dataGroupIdentifier,
  salesDataIdsPendingDelete
) => {
  return {
    type: actionTypes.DELETE_SALES_DATA_ENTRIES,
    payload: {
      dataGroupIdentifier,
      salesDataIdsPendingDelete,
    },
  }
}

export const deleteSalesDataEntriesSuccess = (
  dataGroupIdentifier,
  deletedSalesDataIdsArray
) => {
  return {
    type: actionTypes.DELETE_SALES_DATA_ENTRIES_SUCCESS,
    payload: {
      dataGroupIdentifier,
      deletedSalesDataIdsArray,
    },
  }
}

export const deleteSalesDataEntriesFailed = (dataGroupIdentifier, error) => {
  return {
    type: actionTypes.DELETE_SALES_DATA_ENTRIES_FAILED,
    payload: { dataGroupIdentifier, error },
  }
}
