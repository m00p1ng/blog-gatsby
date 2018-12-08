// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'

interface Props {
  siteTitle: string,
}

const ToggleBurger = () => {
  const burger = document.getElementById('navbar-burger')
  if (burger) {
    burger.classList.toggle('is-active')
  }
}

const Header = ({ siteTitle }: Props) => (
  <header>
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            {siteTitle}
          </Link>
          <div onClick={ToggleBurger} className="navbar-burger burger" data-target="navbar-burger">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navbar-burger" className="navbar-menu">
          <div className="navbar-end">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/tags" className="navbar-item">
              Tags
            </Link>
            <Link to="/categories" className="navbar-item">
              Categories
            </Link>
            <Link to="/about" className="navbar-item">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
