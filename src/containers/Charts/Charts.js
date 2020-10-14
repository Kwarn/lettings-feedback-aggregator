import React, { useState } from 'react'
import Pie from './Pie/Pie'
import classes from './Charts.module.css'

const Charts = ({ tallies }) => {

  return (
    <div className={classes.Wrapper}>
      <Pie tallies={tallies} />
    </div>
  )
}

export default Charts
