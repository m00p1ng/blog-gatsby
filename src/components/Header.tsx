// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'
import Headroom from 'react-headroom'

interface Props {
  siteTitle: string,
}

const ToggleBurger = () => {
  const burgerMenu = document.getElementById('navbar-menu')
  const burgerButton = document.querySelector('.navbar-burger')

  if (burgerMenu && burgerButton) {
    burgerMenu.classList.toggle('is-active')
    burgerButton.classList.toggle('is-active')
  }
}

const Header = ({ siteTitle }: Props) => (
  <header>
    <Headroom>
      <nav
        id="main-navigation"
        className="navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item navbar-center">
              {siteTitle}
            </Link>
            <div onClick={ToggleBurger} className="navbar-burger" data-target="navbar-menu">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div id="navbar-menu" className="navbar-menu">
            <div className="navbar-end">
              <Link to="/" className="navbar-item">
                Home
            </Link>
              <Link to="/tags" className="navbar-item">
                Tags
            </Link>
              <Link to="/about" className="navbar-item">
                About
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </Headroom>
  </header>
)

export default Header
