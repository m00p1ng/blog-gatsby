import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Banner from '../components/Banner'
import Layout from '../components/Layout'

import Data from '../models/data'

const NotFoundPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
            site {
            siteMetadata {
              title
            }
          }
        }
    `}
      render={(data: Data) => (
        <Helmet title={`Not Found | ${data.site.siteMetadata.title}`} />
      )}
    />
    <Banner
      title="404 Not Found"
      subtitle="You just hit a route that doesn&#39;t exist... the sadness."
    />
  </Layout>
)

export default NotFoundPage
