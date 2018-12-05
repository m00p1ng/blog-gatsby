import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Helmet from 'react-helmet'

import '../assets/scss/all.scss'
import Footer from './Footer'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <div className="site">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
          bodyAttributes={{ class: 'has-navbar-fixed-top' }}
        >
          <html lang="en" />
        </Helmet>

        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="site-content">{children}</div>
        <Footer />
      </div>
    )}
  />
)

export default Layout
