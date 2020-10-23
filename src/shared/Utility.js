import _ from 'lodash'

export const locationObjectKeyNameToStr = [
  { poplar: 'Poplar' },
  { canningTown: 'Canning Town' },
  { epsom: 'Epsom' },
  { lewisham: 'Lewisham' },
  { walthamstow: 'Walthamstow' },
  { hayes: 'Hayes' },
  { stepneyGreen: 'Stepney Green' },
]
export const reasonObjectKeyNameToStr = [
  { cost: 'Cost' },
  { commute: 'Commute Distance' },
  { travelLinks: 'Travel Links' },
]
export const convertStrToKeyName = {
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
}
export const convertKeyNameToStr = {
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
}
export const orderedLocationKeyNameStringsArray = [
  'canningTown',
  'epsom',
  'hayes',
  'lewisham',
  'poplar',
  'stepneyGreen',
  'walthamstow',
]
export const orderedReasonKeyNameStringsArray = [
  'commute',
  'cost',
  'travelLinks',
]

export const mergeObjects = (...params) => _.merge({}, ...params)

export function tallyArrayOfStrings(strArr) {
  return strArr.reduce((acc, curr) => {
    typeof acc[curr] === 'undefined' ? (acc[curr] = 1) : (acc[curr] += 1)
    return acc
  }, {})
}

export function removePropertiesById(object, idsArray) {
  const updatedObject = { ...object }
  idsArray.forEach(id => {
    delete updatedObject[id]
  })
  return updatedObject
}

export const mapLocationKeyNameToDisplayableStr = key => {
  const locations = {
    canningTown: 'Canning Town',
    epsom: 'Epsom',
    hayes: 'Hayes',
    lewisham: 'Lewisham',
    poplar: 'Poplar',
    stepneyGreen: 'Stepney Green',
    walthamstow: 'Walthamstow',
  }
  return locations[key]
}

// object keys are un-quoted on format without wrapping brackets

export const mapLocationDisplayStrToKeyName = displayStr => {
  const locations = {
    'Canning Town': 'canningTown',
    Epsom: 'epsom',
    Hayes: 'hayes',
    Lewisham: 'lewisham',
    Poplar: 'poplar',
    'Stepney Green': 'stepneyGreen',
    Walthamstow: 'walthamstow',
  }
  return locations[displayStr]
}

export const mapReasonKeyNameToDisplayableStr = key => {
  const reasons = {
    commute: 'Commute Distance',
    cost: 'Cost',
    travelLinks: 'Travel Links',
  }
  return reasons[key]
}

export const mapReasonDisplayStrToKeyName = displayStr => {
  const reasons = {
    'Commute Distance': 'commute',
    Cost: 'cost',
    'Travel Links': 'travelLinks',
  }
  return reasons[displayStr]
}

export function updateTallyData(tallyData, newTallyData, mode) {
  const tallyDataDeepCopy = _.cloneDeep(tallyData)
  const newTallyDataValues = {}

  if (mode === 'INCREMENT') {
    for (let parentKey in newTallyData) {
      for (let childKey in newTallyData[parentKey]) {
        if (!(childKey in tallyDataDeepCopy[parentKey])) {
          newTallyDataValues[parentKey] = {
            [childKey]: newTallyData[parentKey][childKey],
          }
        } else {
          newTallyDataValues[parentKey] = {
            [childKey]: (tallyDataDeepCopy[parentKey][childKey] +=
              newTallyData[parentKey][childKey]),
          }
        }
      }
    }

    const updatedTallyData = _.merge(tallyDataDeepCopy, newTallyDataValues)
    return updatedTallyData
  }

  if (mode === 'DECREMENT') {
    for (let parentKey in newTallyData) {
      for (let childKey in newTallyData[parentKey]) {
        newTallyDataValues[parentKey] = {
          [childKey]: (tallyDataDeepCopy[parentKey][childKey] -=
            newTallyData[parentKey][childKey]),
        }
      }
    }
    const updatedTallyData = _.merge(tallyDataDeepCopy, newTallyDataValues)
    return updatedTallyData
  }
}
