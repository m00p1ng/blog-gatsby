// @ts-ignore
import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Footer from './Footer'
import Header from './Header'

import Data from '../models/Data'
import './fontawesome'

import '../assets/scss/index.scss'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={(data: Data) => (
      <div className="site">
        <Helmet
          title={`${data.site.siteMetadata.title} | ${data.site.siteMetadata.subtitle}`}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          bodyAttributes={{ class: 'has-navbar-fixed-top' }}
        >
          <html lang="en" />
        </Helmet>

        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="site-content">
          <div className="container">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    )}
  />
)

export default Layout
