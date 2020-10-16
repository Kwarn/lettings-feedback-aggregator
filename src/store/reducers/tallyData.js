import * as actionTypes from '../actions/actionTypes'
import { mergeObjects, tallyArrayOfStrings } from '../../shared/Utility'

const initalState = {}

function mapReasonsToLocation(fbData, location) {
  const reasonsArr = []
  for (let entry in fbData) {
    if (entry !== 'shouldRefetchFeedbackData')
      if (fbData[entry].location === location)
        reasonsArr.push(fbData[entry].reason)
  }
  return { [location]: tallyArrayOfStrings(reasonsArr) }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TALLY_DATA_SUCCESS:
      return mergeObjects(state, action.tallyData)
    case actionTypes.POST_TALLY_DATA_SUCCESS:
      return mergeObjects(state, action.updatedTallyData)
    case actionTypes.MAP_REASONS_TO_LOCATION:
      return mergeObjects(
        state,
        mapReasonsToLocation(action.fbData, action.location)
      )
    default:
      return state
  }
}

export default reducer
