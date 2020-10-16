import axios from '../../shared/axios-feedback'
import * as actions from '../actions/'
import { put } from 'redux-saga/effects'

export function* putTallyDataSaga(action) {
  try {
    const res = yield axios.put('/tallies.json', action.updatedTallyData)
    yield put(actions.putTallyDataSuccess(action.updatedTallyData))
  } catch (error) {
    yield put(actions.putTallyDataFailed(error))
  }
}

export function* fetchTallyDataSaga() {
  try {
    const res = yield axios.get('tallies.json')
    yield put(actions.fetchTallyDataSuccess(res.data))
  } catch (error) {
    yield put(actions.fetchTallyDataFailed(error))
  }
}
