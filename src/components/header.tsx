import { Link } from 'gatsby'
import * as React from 'react'

interface Props {
  siteTitle: string,
}

const Header = ({ siteTitle }: Props) => (
  <nav
    className="navbar is-fixed-top is-transparent"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item ">
          {siteTitle}
        </Link>
      </div>

      <div id="navbar-menu" className="navbar-menu is-static">
        <div className="navbar-end">
          <Link to="/about" className="navbar-item is-secondary">
            About
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

export default Header
