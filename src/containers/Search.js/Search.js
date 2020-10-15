import React from 'react'

const Search = () => {

  const locations = [
    { poplar: 'Poplar' },
    { canningTown: 'Canning Town' },
    { epsom: 'Epsom' },
    { lewisham: 'Lewisham' },
    { walthamstow: 'Walthamstow' },
    { hayes: 'Hayes' },
    { stepneyGreen: 'Stepney Green' },
  ]
  
  const locationMenuItems = locations.map(l => {
    const key = Object.keys(l)[0]
    return <MenuItem key={key} value={key}>{`${l[key]}`}</MenuItem>
  })

  return (
    <div>
      
    </div>
  )
}

export default Search
