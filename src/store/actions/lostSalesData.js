import * as actionTypes from './actionTypes'

export const postLostSalesData = lostSalesEntry => {
  return {
    type: actionTypes.POST_LOST_SALES_DATA,
    lostSalesEntry,
  }
}

export const postLostSalesDataSuccess = newEntryWithId => {
  return {
    type: actionTypes.POST_LOST_SALES_DATA_SUCCESS,
    newEntryWithId,
  }
}

export const postLostSalesDataFailed = error => {
  return {
    type: actionTypes.POST_LOST_SALES_DATA_FAILED,
    error,
  }
}

export const fetchLostSalesData = () => {
  return {
    type: actionTypes.FETCH_LOST_SALES_DATA,
  }
}

export const fetchLostSalesDataSuccess = lostSalesData => {
  return {
    type: actionTypes.FETCH_LOST_SALES_DATA_SUCCESS,
    lostSalesData,
  }
}

export const fetchLostSalesDataFailed = error => {
  return {
    type: actionTypes.FETCH_LOST_SALES_DATA_FAILED,
    error,
  }
}

export const deleteLostSalesDataEntries = entries => {
  return {
    type: actionTypes.DELETE_LOST_SALES_DATA_ENTRIES,
    entries,
  }
}

export const deleteLostSalesDataEntriesSuccess = idsDeletedArr => {
  return {
    type: actionTypes.DELETE_LOST_SALES_DATA_ENTRIES_SUCCESS,
    idsDeletedArr,
  }
}

export const deleteLostSalesDataEntriesFailed = error => {
  return {
    type: actionTypes.DELETE_LOST_SALES_DATA_ENTRIES_FAILED,
    error,
  }
}
