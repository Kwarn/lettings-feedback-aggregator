import * as actionTypes from '../actions/actionTypes'
import { mergeObjects, removePropertiesById } from '../../shared/Utility'

const initalState = {}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PENDING_SALES_DATA_SUCCESS:
      return mergeObjects(state, action.fbData)

    case actionTypes.POST_PENDING_SALES_DATA_SUCCESS:
      return mergeObjects(state, action.newFbDataEntry)

    case actionTypes.DELETE_PENDING_SALES_DATA_ENTRIES_SUCCESS:
      return removePropertiesById(state, action.idsDeletedArr)
    default:
      return state
  }
}

export default reducer
