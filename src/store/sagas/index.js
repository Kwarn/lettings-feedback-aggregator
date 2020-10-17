import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {
  fetchLostSalesDataSaga,
  postLostSalesDataSaga,
  deleteLostSalesDataEntriesSaga,
} from './lostSalesData'
import {
  fetchLostSalesTallyDataSaga,
  putLostSalesTallyDataSaga,
} from './lostSalesTallyData'
import {
  fetchPendingSalesDataSaga,
  postPendingSalesDataSaga,
  deletePendingSalesDataEntriesSaga,
} from './pendingSalesData'
import {
  fetchPendingSalesTallyDataSaga,
  putPendingSalesTallyDataSaga,
} from './pendingSalesTallyData'

export function* watchLostSalesData() {
  yield all([
    takeLatest(actionTypes.FETCH_LOST_SALES_DATA, fetchLostSalesDataSaga),
    takeEvery(actionTypes.POST_LOST_SALES_DATA, postLostSalesDataSaga),
    takeEvery(
      actionTypes.DELETE_LOST_SALES_DATA_ENTRIES,
      deleteLostSalesDataEntriesSaga
    ),
  ])
}

export function* watchLostSalesTallyData() {
  yield all([
    takeLatest(
      actionTypes.FETCH_LOST_SALES_TALLY_DATA,
      fetchLostSalesTallyDataSaga
    ),
    takeEvery(actionTypes.PUT_LOST_SALES_TALLY_DATA, putLostSalesTallyDataSaga),
  ])
}

export function* watchPendingSalesData() {
  yield all([
    takeLatest(actionTypes.FETCH_PENDING_SALES_DATA, fetchPendingSalesDataSaga),
    takeEvery(actionTypes.POST_PENDING_SALES_DATA, postPendingSalesDataSaga),
    takeEvery(
      actionTypes.DELETE_PENDING_SALES_DATA_ENTRIES,
      deletePendingSalesDataEntriesSaga
    ),
  ])
}

export function* watchPendingSalesTallyData() {
  yield all([
    takeLatest(
      actionTypes.FETCH_PENDING_SALES_TALLY_DATA,
      fetchPendingSalesTallyDataSaga
    ),
    takeEvery(
      actionTypes.PUT_PENDING_SALES_TALLY_DATA,
      putPendingSalesTallyDataSaga
    ),
  ])
}
