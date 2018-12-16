import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Footer from './Footer'
import Header from './Header'
import ScrollToTopButton from './ScrollToTopButton'

import Data from '../models/Data'
import './fontawesome'

import '../assets/scss/index.scss'

interface Props {
  children: React.ReactNode
}

interface LayoutRenderProps {
  children: React.ReactNode
  data: Data
}

const LayoutRender = ({ children, data }: LayoutRenderProps) => {
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
    <div className="site">
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
      <Header siteTitle={`:${title}:`} />
      <div className="site-content">
        {children}
      </div>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={(data: Data) => (
      LayoutRender({ children, data })
    )}
  />
)

export default Layout
