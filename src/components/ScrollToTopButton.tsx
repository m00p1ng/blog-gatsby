import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { animateScroll } from 'react-scroll'

window.onscroll = function () { scrollFunction() }

const scrollFunction = () => {
  const scrollButton = document.getElementById('scroll-to-top')
  if (scrollButton) {
    if (document.body.scrollTop > 400) {
      scrollButton.style.opacity = '1'
      scrollButton.style.cursor = 'pointer'
    } else {
      scrollButton.style.cursor = 'default'
      scrollButton.style.opacity = '0'
    }
  }
}

const handleClick = () => {
  animateScroll.scrollToTop()
}

const ScrollToTopButton = () => (
  <button onClick={handleClick} id="scroll-to-top" className="button is-danger">
    <div className="scroll-text">
      <span className="icon">
        <FontAwesomeIcon icon="arrow-up" />
      </span>
      <small className="has-text-weight-bold scroll-not-mobile">BACK TO TOP</small>
      <small className="has-text-weight-bold scroll-mobile">TOP</small>
    </div>
  </button>
)

export default ScrollToTopButton
