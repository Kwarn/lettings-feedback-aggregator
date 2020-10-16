import * as actionTypes from '../actions/actionTypes'
import { mergeObjects, tallyArrayOfStrings } from '../../shared/Utility'

const initalState = {
  locationObjectKeyNameToStr: [
    { poplar: 'Poplar' },
    { canningTown: 'Canning Town' },
    { epsom: 'Epsom' },
    { lewisham: 'Lewisham' },
    { walthamstow: 'Walthamstow' },
    { hayes: 'Hayes' },
    { stepneyGreen: 'Stepney Green' },
  ],
  reasonObjectKeyNameToStr: [
    { cost: 'Cost' },
    { commute: 'Commute Distance' },
    { travelLinks: 'Travel Links' },
  ],

  convertStrToKeyName: {
    'Canning Town': 'canningTown',
    Epsom: 'epsom',
    Hayes: 'hayes',
    Lewisham: 'lewisham',
    Poplar: 'poplar',
    'Stepney Green': 'stepneyGreen',
    Walthamstow: 'walthamstow',
    Cost: 'cost',
    'Commute Distance': 'commute',
    'Travel Links': 'travelLinks',
  },

  convertKeyNameToStr: {
    canningTown: 'Canning Town',
    epsom: 'Epsom',
    hayes: 'Hayes',
    lewisham: 'Lewisham',
    poplar: 'Poplar',
    stepneyGreen: 'Stepney Green',
    walthamstow: 'Walthamstow',
    cost: 'Cost',
    commute: 'Commute Distance',
    travelLinks: 'Travel Links',
  },

  orderedLocationKeyNameStringsArray: [
    'canningTown',
    'epsom',
    'hayes',
    'lewisham',
    'poplar',
    'stepneyGreen',
    'walthamstow',
  ],

  orderedReasonKeyNameStringsArray: ['commute', 'cost', 'travelLinks'],

  location: {
    lewisham: 0,
    poplar: 0,
    canningTown: 0,
    epsom: 0,
    walthamstow: 0,
    hayes: 0,
    stepneyGreen: 0,
  },
  reason: {
    commute: 0,
    condition: 0,
    cost: 0,
    failedFinance: 0,
    noReason: 0,
    personal: 0,
    pet: 0,
    travelLinks: 0,
    size: 0,
    staff: 0,
    otherTennants: 0,
  },
}

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
    case actionTypes.PUT_TALLY_DATA_SUCCESS:
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
