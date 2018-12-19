import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTopButton from './ScrollToTopButton'

import Data from '../models/Data'
import './fontawesome'

import '../assets/scss/index.scss'

const SiteWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  flex: 1 0 auto;

  .container {
    max-width: 960px;
    width: 100%;
  }
`

interface Props {
  children: React.ReactNode
}

interface LayoutRenderProps {
  children: React.ReactNode
  data: Data
}

const renderLayout = ({ children, data }: LayoutRenderProps) => {
  const {
    title,
    description,
    subtitle,
    author,
    url,
  } = data.site!.siteMetadata
  const siteTitleName = `${title} - ${subtitle}`
  const iconImage = `${url}/favicon.png`

  return (
    <SiteWrapper>
      <Helmet title={siteTitleName}>
        <html lang="en" />

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
        url,
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
