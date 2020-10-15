import axios from '../../shared/axios-feedback'
import * as actions from '../actions/'
import { put } from 'redux-saga/effects'

export function* postFeedbackDataSaga(action) {
  try {
    yield axios.post('/feedback.json', action.newFbDataEntry)
    yield put(actions.postFeedbackDataSuccess())
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
