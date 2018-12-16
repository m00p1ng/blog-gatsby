import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { animateScroll } from 'react-scroll'

import '../assets/scss/scroll.scss'

if (typeof window !== 'undefined') {
  window.onscroll = function () {
    scrollFunction()
  }
}

const scrollFunction = () => {
  const scrollButton = document.getElementById('scroll-to-top')
  const scrollHeight = 200

  if (scrollButton) {
    if (
      document.body.scrollTop > scrollHeight ||
      document.documentElement.scrollTop > scrollHeight
    ) {
      scrollButton.style.opacity = '1'
      scrollButton.style.cursor = 'pointer'
    } else {
      scrollButton.style.opacity = '0'
      scrollButton.style.cursor = 'default'
    }
  }
}

const handleClick = () => {
  animateScroll.scrollToTop()
}

const ScrollToTopButton = () => (
  <button onClick={handleClick} id="scroll-to-top" className="button is-danger scroll">
    <div className="scroll__text">
      <span className="icon">
        <FontAwesomeIcon icon="arrow-up" />
      </span>
      <small className="has-text-weight-bold scroll__not-mobile">BACK TO TOP</small>
      <small className="has-text-weight-bold scroll__mobile">TOP</small>
    </div>
  </button>
)

export default ScrollToTopButton
