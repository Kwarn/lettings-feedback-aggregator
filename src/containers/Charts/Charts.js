import React, { useState } from 'react'
import Pie from './Pie/Pie'

const Charts = ({ tallies }) => {
  return (
    <div className={null}>
      <Pie tallies={tallies} />
    </div>
  )
}

export default Charts
