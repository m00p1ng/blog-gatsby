import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Banner from '../components/Banner'
import Layout from '../components/Layout'

import Data from '../models/data'

const About = () => (
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
        <Helmet title={`About | ${data!.site!.siteMetadata.title}`} />
      )}
    />
    <Banner title="About" />
  </Layout>
)

export default About
