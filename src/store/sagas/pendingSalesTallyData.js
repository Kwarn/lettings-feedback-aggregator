import axios from '../../shared/axios-feedback'
import * as actions from '../actions'
import { put } from 'redux-saga/effects'

export function* putPendingSalesTallyDataSaga(action) {
  try {
    const res = yield axios.put(
      '/pendingSalesTallyData.json',
      action.updatedPendingSalesTallyData
    )
    yield put(
      actions.putPendingSalesTallyDataSuccess(
        action.updatedPendingSalesTallyData
      )
    )
  } catch (error) {
    yield put(actions.putPendingSalesTallyDataFailed(error))
  }
}

export function* fetchPendingSalesTallyDataSaga() {
  try {
    const res = yield axios.get('pendingSalesTallyData.json')
    yield put(actions.fetchPendingSalesTallyDataSuccess(res.data))
  } catch (error) {
    yield put(actions.fetchPendingSalesTallyDataFailed(error))
  }
}
