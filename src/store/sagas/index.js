import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'
import {
  fetchFeedbackDataSaga,
  postFeedbackDataSaga,
  deleteFeedbackDataEntriesSaga,
} from './feedbackData'
import { fetchTallyDataSaga, postTallyDataSaga } from './tallyData'

export function* watchFeedbackData() {
  yield all([
    takeLatest(actionTypes.FETCH_FEEDBACK_DATA, fetchFeedbackDataSaga),
    takeEvery(actionTypes.POST_FEEDBACK_DATA, postFeedbackDataSaga),
    takeEvery(
      actionTypes.DELETE_FEEDBACK_DATA_ENTRIES,
      deleteFeedbackDataEntriesSaga
    ),
  ])
}

export function* watchTallyData() {
  yield all([
    takeLatest(actionTypes.FETCH_TALLY_DATA, fetchTallyDataSaga),
    takeEvery(actionTypes.POST_TALLY_DATA, postTallyDataSaga),
  ])
}
