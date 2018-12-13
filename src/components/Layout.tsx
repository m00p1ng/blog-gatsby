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

interface LayoutRenderProps {
  children: React.ReactNode
  data: Data
}

const LayoutRender = ({ children, data }: LayoutRenderProps) => {
  const { title, subtitle } = data.site.siteMetadata

  return (
    <div className="site">
      <Helmet title={`${title} - ${subtitle}`} />
      <Header siteTitle={title} />
      <div className="site-content">
        {children}
      </div>
      <Footer />
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
