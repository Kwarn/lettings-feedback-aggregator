import axios from '../../shared/axios-feedback'
import * as actions from '../actions'
import { put } from 'redux-saga/effects'

const paths = {
  LOST_SALES: 'lostSalesData',
  PENDING_SALES: 'pendingSalesData',
  COMPLETED_SALES: 'completedSalesData',
}

export function* postSalesDataSaga(action) {
  try {
    const res = yield axios.post(
      `/${paths[action.payload.dataGroupIdentifier]}.json`,
      action.payload.newSalesDataEntry
    )
    const newSalesDataEntry = {
      [res.data.name]: action.payload.newSalesDataEntry,
    }
    yield put(
      actions.postSalesDataSuccess(
        action.payload.dataGroupIdentifier,
        newSalesDataEntry
      )
    )
  } catch (error) {
    yield put(
      actions.postSalesDataFailed(action.payload.dataGroupIdentifier, error)
    )
  }
}

export function* fetchSalesDataSaga(action) {
  try {
    const res = yield axios.get(
      `${paths[action.payload.dataGroupIdentifier]}.json`
    )

    yield put(
      actions.fetchSalesDataSuccess(
        action.payload.dataGroupIdentifier,
        res.data
      )
    )
  } catch (error) {
    yield put(
      actions.fetchSalesDataFailed(action.payload.dataGroupIdentifier, error)
    )
  }
}

export function* deleteSalesDataEntriesSaga(action) {
  try {
    const res = yield Promise.all(
      action.payload.salesDataIdsPendingDelete.map(id =>
        axios.delete(`/${paths[action.payload.dataGroupIdentifier]}/${id}.json`)
      )
    )
    yield put(
      actions.deleteSalesDataEntriesSuccess(
        action.payload.dataGroupIdentifier,
        action.payload.salesDataIdsPendingDelete
      )
    )
  } catch (error) {
    yield put(
      actions.deleteSalesDataEntriesFailed(
        action.payload.dataGroupIdentifier,
        error
      )
    )
  }
}
