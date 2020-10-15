import { takeEvery, all } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import { fetchFeedbackDataSaga, postFeedbackDataSaga } from './feedbackData'
import { fetchTallyDataSaga, postTallyDataSaga } from './tallyData'

export function* watchFeedbackData() {
  yield all([
    takeEvery(actionTypes.FETCH_FEEDBACK_DATA, fetchFeedbackDataSaga),
    takeEvery(actionTypes.POST_FEEDBACK_DATA, postFeedbackDataSaga),
  ])
}

export function* watchTallyData() {
  yield all([
    takeEvery(actionTypes.FETCH_TALLY_DATA, fetchTallyDataSaga),
    takeEvery(actionTypes.POST_TALLY_DATA, postTallyDataSaga),
  ])
}
