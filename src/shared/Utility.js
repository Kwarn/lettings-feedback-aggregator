export function mergeObjects(...args) {
  const merged = Array.from(arguments).reduce((combined, item) => {
    return { ...combined, ...item }
  })
  return merged
}

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
  // newTallyData = {
  // location: {[location]: count, [location]: count},
  // reason: {[reason]: count, [reason]: count}
  // }

  let tempLocationTally = {}
  let tempReasonTally = {}

  for (let loc in newTallyData.location) {
    if (mode === 'INCREMENT') {
      tempLocationTally = {
        [loc]: (tallyData.location[loc] += newTallyData.location[loc]),
      }
    }
    if (mode === 'DECREMENT') {
      tempLocationTally = {
        [loc]: (tallyData.location[loc] -= newTallyData.location[loc]),
      }
    }
  }

  for (let re in newTallyData.reason) {
    if (mode === 'INCREMENT') {
      tempReasonTally = {
        [re]: (tallyData.reason[re] += newTallyData.reason[re]),
      }
    }
    if (mode === 'DECREMENT') {
      tempReasonTally = {
        [re]: (tallyData.reason[re] -= newTallyData.reason[re]),
      }
    }
  }

  const updatedLocationObj = mergeObjects(tallyData.location, tempLocationTally)
  const updatedReasonObj = mergeObjects(tallyData.reason, tempReasonTally)

  return {
    location: { ...updatedLocationObj },
    reason: { ...updatedReasonObj },
  }
}
