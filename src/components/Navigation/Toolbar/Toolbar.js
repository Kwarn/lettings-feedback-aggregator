import React, { useState, useEffect } from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './Toolbar.module.css'

const Toolbar = () => {
  const [scrollPos, setScrollPos] = useState({
    posY: window.pageYOffset,
    visible: true,
  })

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  const scrollHandler = () => {
    const newScrollPos = window.pageYOffset
    const visible = scrollPos.posY > newScrollPos
    setScrollPos({ posY: newScrollPos, visible: visible })
  }

  return (
    <header
      className={
        !scrollPos.visible
          ? `${classes.Toolbar} ${classes.ToolbarHidden}`
          : `${classes.Toolbar} ${classes.ToolbarShown}`
      }
    >
      <nav>
        <NavigationItems />
      </nav>
    </header>
  )
}

export default Toolbar
