import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {
  fetchSalesDataSaga,
  postSalesDataSaga,
  deleteSalesDataEntriesSaga,
} from './salesData'
import {
  fetchSalesTallyDataSaga,
  putSalesTallyDataSaga,
} from './salesTallyData'

export function* watchSalesData() {
  yield all([
    takeLatest(actionTypes.FETCH_SALES_DATA, fetchSalesDataSaga),
    takeEvery(actionTypes.POST_SALES_DATA, postSalesDataSaga),
    takeEvery(
      actionTypes.DELETE_SALES_DATA_ENTRIES,
      deleteSalesDataEntriesSaga
    ),
  ])
}

export function* watchSalesTallyData() {
  yield all([
    takeLatest(actionTypes.FETCH_SALES_TALLY_DATA, fetchSalesTallyDataSaga),
    takeEvery(actionTypes.PUT_SALES_TALLY_DATA, putSalesTallyDataSaga),
  ])
}
