import * as actionTypes from '../actions/actionTypes'
import { tallyArrayOfStrings } from '../../shared/Utility'
import _ from 'lodash'

const initalState = {
  location: {},
  reason: {},
}

const paths = {
  LOST_SALES: 'lostSalesTallyData',
  PENDING_SALES: 'pendingSalesTallyData',
  COMPLETED_SALES: 'completedSalesTallyData',
}

function mapReasonsToLocation(fbData, location) {
  const reasonsArr = []
  for (let entry in fbData) {
    if (fbData[entry].location === location)
      reasonsArr.push(fbData[entry].reason)
  }
  return { [location]: tallyArrayOfStrings(reasonsArr) }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SALES_TALLY_DATA_SUCCESS:
      const salesDataGroupId = paths[action.payload.dataGroupIdentifier]
      return { ...state, [salesDataGroupId]: action.payload.salesTallyData }
    case actionTypes.PUT_SALES_TALLY_DATA_SUCCESS:
      return _.merge(state, action.payload.updatedSalesTallyData)
    case actionTypes.MAP_REASONS_TO_LOCATION:
      return _.merge(
        state,
        mapReasonsToLocation(action.fbData, action.location)
      )
    default:
      return state
  }
}

export default reducer
