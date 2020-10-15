import React from 'react'
import Pie from './Pie/Pie'

const Charts = ({ tallyData }) => {
  return (
    <div className={null}>
      <Pie tallyData={tallyData} />
    </div>
  )
}

export default Charts
