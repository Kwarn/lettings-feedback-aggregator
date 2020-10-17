import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const NavigationItems = () => {
  return (
    <ul className={classes.NavItems}>
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="/pending">Pending Sales</NavigationItem>
      <NavigationItem link="/completed">Completed Sales</NavigationItem>
      <NavigationItem link="/lost">Lost Sales</NavigationItem>
    </ul>
  )
}

export default NavigationItems
