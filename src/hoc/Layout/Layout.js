import React from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

const Layout = props => {
  return (
    <>
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </>
  )
}

export default Layout
