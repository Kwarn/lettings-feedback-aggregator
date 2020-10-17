import axios from '../../shared/axios-feedback'
import * as actions from '../actions'
import { put } from 'redux-saga/effects'

export function* postPendingSalesDataSaga(action) {
  try {
    const res = yield axios.post(
      '/pendingSalesData.json',
      action.newPendingSalesDataEntry
    )
    const newEntryWithId = {
      [res.data.name]: action.newPendingSalesDataEntry,
    }
    yield put(actions.postPendingSalesDataSuccess(newEntryWithId))
  } catch (error) {
    yield put(actions.postPendingSalesDataFailed(error))
  }
}

export function* fetchPendingSalesDataSaga() {
  try {
    const res = yield axios.get('pendingSalesData.json')
    yield put(actions.fetchPendingSalesDataSuccess(res.data))
  } catch (error) {
    yield put(actions.fetchPendingSalesDataFailed(error))
  }
}

export function* deletePendingSalesDataEntriesSaga(action) {
  try {
    const idsDeletedArr = action.entries.map(entry => entry.id)
    yield Promise.all(
      idsDeletedArr.map(id => axios.delete(`/pendingSalesData/${id}.json`))
    )
    yield put(actions.deletePendingSalesDataEntriesSuccess(idsDeletedArr))
  } catch (error) {
    yield put(actions.deletePendingSalesDataEntriesFailed())
  }
}
