import * as actionTypes from '../actions/actionTypes'
import _ from 'lodash'

const initalState = {}

const paths = {
  LOST_SALES: 'lostSalesData',
  PENDING_SALES: 'pendingSalesData',
  COMPLETED_SALES: 'completedSalesData',
}
function updateSalesDataGroup(state, identifier, data) {
  const targetObject = paths[identifier]
  return {
    ...state,
    [targetObject]: {
      ...state[targetObject],
      ...data,
    },
  }
}

function removeSalesDataById(state, identifier, idsArray) {
  const targetSalesDataObject = paths[identifier]
  const updatedSalesDataObject = _.cloneDeep(state[targetSalesDataObject])

  idsArray.forEach(id => {
    delete updatedSalesDataObject[id]
  })

  return { ...state, [targetSalesDataObject]: { ...updatedSalesDataObject } }
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SALES_DATA_SUCCESS:
      return updateSalesDataGroup(
        state,
        action.payload.dataGroupIdentifier,
        action.payload.salesData
      )
    case actionTypes.POST_SALES_DATA_SUCCESS:
      return updateSalesDataGroup(
        state,
        action.payload.dataGroupIdentifier,
        action.payload.newSalesDataEntry
      )

    case actionTypes.DELETE_SALES_DATA_ENTRIES_SUCCESS:
      return removeSalesDataById(
        state,
        action.payload.dataGroupIdentifier,
        action.payload.deletedSalesDataIdsArray
      )
    default:
      return state
  }
}

export default reducer
