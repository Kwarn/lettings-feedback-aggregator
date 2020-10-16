import axios from '../../shared/axios-feedback'
import * as actions from '../actions/'
import { put } from 'redux-saga/effects'

export function* postFeedbackDataSaga(action) {
  try {
    const res = yield axios.post('/feedback.json', action.newFbDataEntry)
    const newEntryWithId = { [res.data.name]: action.newFbDataEntry }
    yield put(actions.postFeedbackDataSuccess(newEntryWithId))
  } catch (error) {
    yield put(actions.postFeedbackDataFailed(error))
  }
}

export function* fetchFeedbackDataSaga() {
  try {
    const res = yield axios.get('feedback.json')
    yield put(actions.fetchFeedbackDataSuccess(res.data))
  } catch (error) {
    yield put(actions.fetchFeedbackDataFailed(error))
  }
}

export function* deleteFeedbackDataEntriesSaga(action) {
  try {
    const idsDeletedArr = action.entries.map(entry => entry.id)
    yield Promise.all(
      idsDeletedArr.map(id => axios.delete(`/feedback/${id}.json`))
    )
    yield put(actions.deleteFbDataEntriesSuccess(idsDeletedArr))
  } catch (error) {
    yield put(actions.deleteFbDataEntriesFailed())
  }
}
