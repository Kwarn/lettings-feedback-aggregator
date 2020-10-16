import * as actionTypes from '../actions/actionTypes'
import {
  mergeObjects,
  removePropertiesById,
  tallyArrayOfStrings,
} from '../../shared/Utility'
import { pushNewObjectToTallyDataState } from '../actions'

const initalState = {
  shouldRefetchFeedbackData: true,
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FEEDBACK_DATA_SUCCESS:
      return mergeObjects(state, action.fbData, {
        shouldRefetchFeedbackData: false,
      })

    case actionTypes.POST_FEEDBACK_DATA_SUCCESS:
      return mergeObjects(state, { shouldRefetchFeedbackData: true })

    case actionTypes.DELETE_FEEDBACK_DATA_ENTRIES_SUCCESS:
      return removePropertiesById(state, action.idsDeletedArr)
    default:
      return state
  }
}

export default reducer
