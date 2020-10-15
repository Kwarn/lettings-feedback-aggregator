export function updateObject(target, ...args) {
  const merged = Array.from(arguments).reduce((combined, item) => {
    return { ...combined, ...item }
  })
  return merged
}

export const mapLocationKeyNameToDisplayableName = key => {
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

export const mapReasonKeyNameToDisplayableName = key => {
  const reasons = {
    cost: 'Cost',
    commute: 'Commute Distance',
    travelLinks: 'Travel Links',
  }
  return reasons[key]
}
