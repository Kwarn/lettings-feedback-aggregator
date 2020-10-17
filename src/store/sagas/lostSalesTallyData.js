import axios from '../../shared/axios-feedback'
import * as actions from '../actions'
import { put } from 'redux-saga/effects'

export function* putLostSalesTallyDataSaga(action) {
  try {
    const res = yield axios.put(
      '/lostSalesTallyData.json',
      action.updatedLostSalesTallyData
    )
    yield put(
      actions.putLostSalesTallyDataSuccess(action.updatedLostSalesTallyData)
    )
  } catch (error) {
    yield put(actions.putLostSalesTallyDataFailed(error))
  }
}

export function* fetchLostSalesTallyDataSaga() {
  try {
    const res = yield axios.get('lostSalesTallyData.json')
    yield put(actions.fetchLostSalesTallyDataSuccess(res.data))
  } catch (error) {
    yield put(actions.fetchLostSalesTallyDataFailed(error))
  }
}
