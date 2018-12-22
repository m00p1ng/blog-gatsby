import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

const FooterLink = styled.a`
  color: white;
  &:hover {
    color: orange;
    text-decoration: underline;
  }
`

const FooterWrapper = styled.footer`
  padding: 3rem;
`

const SubtitleWrapper = styled.small`
  display: flex;
  justify-content: center;
`

const HeartIcon = styled(FontAwesomeIcon).attrs({
  icon: 'heart'
})`
  color: red;
`

const CodeIcon = styled(FontAwesomeIcon).attrs({
  icon: 'code'
})`
  color: orange;
  margin-right: 5px;
  margin-bottom: 2px;
`

const Footer = () => (
  <FooterWrapper>
    <div className="has-text-centered has-text-white">
      <p>m00p1ng © 2018 all right reserved.</p>
      <SubtitleWrapper>
        <span className="icon">
          <CodeIcon />
        </span>
        with
        <span className="icon">
          <HeartIcon />
        </span>
        using&nbsp;
        <FooterLink href="https://gatsbyjs.org">Gatsby</FooterLink>
        &nbsp;+&nbsp;
        <FooterLink href="https://bulma.io">Bulma</FooterLink>.
      </SubtitleWrapper>
    </div>
  </FooterWrapper>
)

export default Footer
