import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTopButton from './ScrollToTopButton'

import Data from '../models/Data'

import '../assets/scss/index.scss'
import '../utils/fontawesome'

const SiteWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.main.attrs({
  className: 'site-content'
})`
  flex: 1 0 auto;
`

interface Props {
  children: React.ReactNode
}

interface LayoutRenderProps {
  children: React.ReactNode
  data: Data
}

if (typeof document !== 'undefined') {
  document.documentElement.className = (
    'ontouchstart' in document.documentElement ? 'touch' : 'no-touch'
  )
}

const renderLayout = ({ children, data }: LayoutRenderProps) => {
  const {
    title,
    description,
    subtitle,
    author,
    siteURL,
  } = data.site!.siteMetadata
  const siteTitleName = `${title} - ${subtitle}`
  const iconImage = `${siteURL}/favicon.png`

  return (
    <SiteWrapper>
      <Helmet title={siteTitleName}>
        <html lang="th" />

        <meta name="description" content={description} />
        <meta name="author" content={author} />

        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={siteTitleName} />
        <meta name="twitter:card" content={iconImage} />
        <meta name="twitter:image:src" content={iconImage} />

        <meta property="og:title" content="m00p1ng - Personal Blog" />
        <meta property="og:site_name" content="m00p1ng - Personal Blog" />
        <meta property="og:type" content="blog" />
        <meta property="og:locale" content="th" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={iconImage} />
        <meta property="og:image:secure_url" content={iconImage} />

      </Helmet>
      <Navbar siteTitle={`:${title}:`} />
      <ContentWrapper>
        {children}
      </ContentWrapper>
      <Footer />
      <ScrollToTopButton />
    </SiteWrapper>
  )
}

const siteTitleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        subtitle
        description
        author
        siteURL,
      }
    }
  }
`

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={siteTitleQuery}
    render={(data: Data) => renderLayout({ children, data })}
  />
)

export default Layout
