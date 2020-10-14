import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.module.css'

const navItem = ({ link, children}) => (
  <li className={classes.NavigationItem}>
    <NavLink exact activeClassName={classes.active} to={link}>
      {children}
    </NavLink>
  </li>
)

export default navItem
