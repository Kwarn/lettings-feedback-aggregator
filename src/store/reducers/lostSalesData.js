import * as actionTypes from '../actions/actionTypes'
import { mergeObjects, removePropertiesById } from '../../shared/Utility'

const initalState = {}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LOST_SALES_DATA_SUCCESS:
      return mergeObjects(state, action.lostSalesData)

    case actionTypes.POST_LOST_SALES_DATA_SUCCESS:
      return mergeObjects(state, action.newEntryWithId)

    case actionTypes.DELETE_LOST_SALES_DATA_ENTRIES_SUCCESS:
      return removePropertiesById(state, action.idsDeletedArr)
    default:
      return state
  }
}

export default reducer
