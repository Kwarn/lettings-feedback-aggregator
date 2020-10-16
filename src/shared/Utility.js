export function updateObject(...args) {
  const merged = Array.from(arguments).reduce((combined, item) => {
    return { ...combined, ...item }
  })
  return merged
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
    poplar: 'Poplar',
    canningTown: 'Canning Town',
    epsom: 'Epsom',
    lewisham: 'Lewisham',
    walthamstow: 'Walthamstow',
    hayes: 'Hayes',
    stepneyGreen: 'Stepney Green',
  }
  return locations[key]
}

// object keys are un-quoted on format without wrapping brackets

export const mapLocationDisplayStrToKeyName = displayStr => {
  const locations = {
    Poplar: 'poplar',
    'Canning Town': 'canningTown',
    Epsom: 'epsom',
    Lewisham: 'lewisham',
    Walthamstow: 'walthamstow',
    Hayes: 'hayes',
    'Stepney Green': 'stepneyGreen',
  }
  return locations[displayStr]
}

export const mapReasonKeyNameToDisplayableStr = key => {
  const reasons = {
    cost: 'Cost',
    commute: 'Commute Distance',
    travelLinks: 'Travel Links',
  }
  return reasons[key]
}

export const mapReasonDisplayStrToKeyName = displayStr => {
  const reasons = {
    Cost: 'cost',
    'Commute Distance': 'commute',
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

  const updatedLocationObj = updateObject(tallyData.location, tempLocationTally)
  const updatedReasonObj = updateObject(tallyData.reason, tempReasonTally)

  return {
    ...tallyData,
    location: { ...updatedLocationObj },
    reason: { ...updatedReasonObj },
  }
}
