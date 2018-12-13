import React from 'react'
import styled from 'styled-components'

const FooterLink = styled.a`
  color: orange;
  &:hover {
    color: orange;
    text-decoration: underline;
  }
`

const Footer = () => (
  <footer className="footer">
    <div className="has-text-centered has-text-white">
      <p>m00p1ng © 2018 all right reserved.</p>
      <small>Made with ♥️ using&nbsp;
        <FooterLink href="https://gatsbyjs.org">Gatsby</FooterLink>
        &nbsp;+&nbsp;
        <FooterLink href="https://bulma.io">Bulma</FooterLink>.
      </small>
    </div>
  </footer>
)

export default Footer
