import React from 'react'
import FadeInSection from '../../../containers/FadeInSection/FadeInSection'
import imageAssets from '../../../assets/assets'
import classes from './JumpToSectionArrow.module.css'

import PropTypes from 'prop-types'

/**
 * @param {string} arrowColor 'light' or 'dark' - default is dark
 * @param {string} arrowDirection 'up' or 'down' - default is down
 * @param {string} arrowText accompanying text - color and position adjusts with arrowColor & arrowDirection
 * @param {boolean} shouldFadeIn controls whether arrow fades in or not - default true
 * @param {boolean} shouldPulse controls whether arrow pulses or not - default true
 * @param {func} scrollIntoViewFn A function callback for onClick scrolling an element into view - not required
 */

const JumpToSectionArrow = ({
  arrowColor = 'dark',
  arrowDirection = 'down',
  arrowText,
  scrollIntoViewFn,
  shouldFadeIn = true,
  shouldPulse = true,
}) => {
  const arrowImages = {
    light: {
      up: imageAssets.whiteUpArrow,
      down: imageAssets.whiteDownArrow,
    },
    dark: {
      up: imageAssets.charcoalUpArrow,
      down: imageAssets.charcoalDownArrow,
    },
  }

  const arrowImage = arrowImages[arrowColor][arrowDirection]

  const arrow = (
    <img
      className={`
      ${classes.Arrow}
          ${
            shouldPulse
              ? arrowColor === 'dark'
                ? `${classes.DarkPulseAnimation} ${classes.LightBackground}`
                : `${classes.LightPulseAnimation} ${classes.DarkBackground}`
              : ''
          } `}
      src={arrowImage}
      alt={`arrow ${arrowDirection}`}
    />
  )
  const textElement = arrowText ? (
    <div
      className={`${classes.ArrowText} ${
        arrowColor === 'light' ? classes.LightArrowText : classes.DarkArrowText
      }`}
    >
      {arrowText}
    </div>
  ) : null

  const finalArrow = shouldFadeIn ? (
    <FadeInSection fadeDirection={arrowDirection === 'up' ? 'top' : 'bottom'}>
      {arrowDirection === 'down' ? textElement : null}
      {arrow}
      {arrowDirection === 'up' ? textElement : null}
    </FadeInSection>
  ) : (
    <>
      {arrowDirection === 'down' ? textElement : null}
      {arrow}
      {arrowDirection === 'up' ? textElement : null}
    </>
  )

  return (
    <div
      className={`${classes.Wrapper} ${
        scrollIntoViewFn ? classes.Clickable : ''
      }`}
      onClick={scrollIntoViewFn}
    >
      {finalArrow}
    </div>
  )
}

export default JumpToSectionArrow

JumpToSectionArrow.propTypes = {
  arrowColor: PropTypes.string,
  arrowDirection: PropTypes.string,
  arrowText: PropTypes.string,
  shouldFadeIn: PropTypes.bool,
  shouldPulse: PropTypes.bool,
  scrollIntoViewFn: PropTypes.func,
}
