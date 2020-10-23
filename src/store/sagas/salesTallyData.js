import axios from '../../shared/axios-feedback'
import * as actions from '../actions'
import { put } from 'redux-saga/effects'

const paths = {
  LOST_SALES: 'lostSalesTallyData',
  PENDING_SALES: 'pendingSalesTallyData',
  COMPLETED_SALES: 'completedSalesTallyData',
}

export function* putSalesTallyDataSaga(action) {
  try {
    yield axios.put(
      `/${paths[action.payload.dataGroupIdentifier]}.json`,
      action.payload.updatedSalesTallyData
    )
    yield put(
      actions.putSalesTallyDataSuccess(
        action.payload.dataGroupIdentifier,
        action.payload.updatedSalesTallyData
      )
    )
  } catch (error) {
    yield put(
      actions.putSalesTallyDataFailed(action.payload.dataGroupIdentifier, error)
    )
  }
}

export function* fetchSalesTallyDataSaga(action) {
  try {
    const res = yield axios.get(
      `${paths[action.payload.dataGroupIdentifier]}.json`
    )

    yield put(
      actions.fetchSalesTallyDataSuccess(
        action.payload.dataGroupIdentifier,
        res.data
      )
    )
  } catch (error) {
    yield put(
      actions.fetchSalesTallyDataFailed(
        action.payload.dataGroupIdentifier,
        error
      )
    )
  }
}
