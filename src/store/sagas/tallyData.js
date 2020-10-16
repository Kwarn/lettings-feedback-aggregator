import axios from '../../shared/axios-feedback'
import * as actions from '../actions/'
import { put } from 'redux-saga/effects'

export function* postTallyDataSaga(action) {
  try {
    yield axios.put('/tallies.json', action.updatedTallyData)
    yield put(actions.postTallyDataSuccess(action.updatedTallyData))
  } catch (error) {
    yield put(actions.postTallyDataFailed(error))
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
