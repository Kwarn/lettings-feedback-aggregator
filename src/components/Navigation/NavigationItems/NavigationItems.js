import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = () => {
  return (
    <ul className={classes.NavItems}>
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="/contact">Contact</NavigationItem>
    </ul>
  )
}

export default NavigationItems
