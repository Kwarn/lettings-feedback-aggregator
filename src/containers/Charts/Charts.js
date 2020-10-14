import React, { useState } from 'react'
import Pie from './Pie/Pie'

const Charts = ({ feedbackData }) => {

  return (
    <div>
      <Pie data={feedbackData} />
    </div>
  )
}

export default Charts
