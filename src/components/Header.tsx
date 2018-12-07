// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'

interface Props {
  siteTitle: string,
}

const Header = ({ siteTitle }: Props) => (
  <header>
    <nav
      className="navbar is-fixed-top is-danger"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item ">
            {siteTitle}
          </Link>
          <div className="navbar-burger burger" data-target="navbar-burger">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navbar-burger" className="navbar-menu">
          <div className="navbar-end">
            <Link to="/" className="navbar-item is-secondary">
              Home
            </Link>
            <Link to="/about" className="navbar-item is-secondary">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
