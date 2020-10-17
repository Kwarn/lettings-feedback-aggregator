import * as actionTypes from './actionTypes'

export const postPendingSalesData = PendingSalesEntry => {
  return {
    type: actionTypes.POST_PENDING_SALES_DATA,
    PendingSalesEntry,
  }
}

export const postPendingSalesDataSuccess = PendingSalesEntry => {
  return {
    type: actionTypes.POST_PENDING_SALES_DATA_SUCCESS,
    PendingSalesEntry,
  }
}

export const postPendingSalesDataFailed = error => {
  return {
    type: actionTypes.POST_PENDING_SALES_DATA_FAILED,
    error,
  }
}

export const fetchPendingSalesData = () => {
  return {
    type: actionTypes.FETCH_PENDING_SALES_DATA,
  }
}

export const fetchPendingSalesDataSuccess = newApplicantData => {
  return {
    type: actionTypes.FETCH_PENDING_SALES_DATA_SUCCESS,
    newApplicantData,
  }
}

export const fetchPendingSalesDataFailed = error => {
  return {
    type: actionTypes.FETCH_PENDING_SALES_DATA_FAILED,
    error,
  }
}

export const deletePendingSalesDataEntries = entries => {
  return {
    type: actionTypes.DELETE_PENDING_SALES_DATA_ENTRIES,
    entries,
  }
}

export const deletePendingSalesDataEntriesSuccess = idsDeletedArr => {
  return {
    type: actionTypes.DELETE_PENDING_SALES_DATA_ENTRIES_SUCCESS,
    idsDeletedArr,
  }
}

export const deletePendingSalesDataEntriesFailed = error => {
  return {
    type: actionTypes.DELETE_PENDING_SALES_DATA_ENTRIES_FAILED,
    error,
  }
}
