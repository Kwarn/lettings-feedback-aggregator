import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/Utility'

const initalState = {}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TALLY_DATA_SUCCESS:
      return updateObject(state, action.tallyData)
    default:
      return state
  }
}

export default reducer
