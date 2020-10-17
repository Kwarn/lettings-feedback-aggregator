import axios from '../../shared/axios-feedback'
import * as actions from '../actions'
import { put } from 'redux-saga/effects'

export function* postLostSalesDataSaga(action) {
  try {
    const res = yield axios.post('/lostSalesData.json', action.lostSalesEntry)
    const newEntryWithId = {
      [res.data.name]: action.lostSalesEntry,
    }
    yield put(actions.postLostSalesDataSuccess(newEntryWithId))
  } catch (error) {
    yield put(actions.postLostSalesDataFailed(error))
  }
}

export function* fetchLostSalesDataSaga() {
  try {
    const res = yield axios.get('lostSalesData.json')
    yield put(actions.fetchLostSalesDataSuccess(res.data))
  } catch (error) {
    yield put(actions.fetchLostSalesDataFailed(error))
  }
}

export function* deleteLostSalesDataEntriesSaga(action) {
  try {
    const idsDeletedArr = action.entries.map(entry => entry.id)
    yield Promise.all(
      idsDeletedArr.map(id => axios.delete(`/lostSalesData/${id}.json`))
    )
    yield put(actions.deleteLostSalesDataEntriesSuccess(idsDeletedArr))
  } catch (error) {
    yield put(actions.deleteLostSalesDataEntriesFailed())
  }
}
