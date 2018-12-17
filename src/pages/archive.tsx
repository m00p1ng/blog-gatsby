import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Banner from '../components/Banner'
import Layout from '../components/Layout'

import PageProps from '../models/PageProps'

const TagWrapper = styled.li`
  margin-bottom: 1.2rem;
`

const Archive = ({ data }: PageProps) => {
  const { title: siteTitle } = data!.site!.siteMetadata
  const { totalCount: total, edges: posts } = data!.allMarkdownRemark!

  return (
    <Layout>
      <Helmet title={`Archive | ${siteTitle}`} />
      <Banner
        title={'Archive'}
        subtitle={`${total} post${total !== 1 ? 's' : ''}`}
      />
      <div className="container">
        <div className="blog-container">
          <div className="box">
            <div className="content tag-content">
              <ul>
                {posts!.map(({ node }) => (
                  <TagWrapper key={node.id} >
                    <Link to={node.fields!.slug} className="rainbow">
                      {node.frontmatter!.title}
                    </Link>
                    <small> - {node.frontmatter!.date}</small>
                  </TagWrapper>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Archive

export const query = graphql`
  query ArchiveQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      filter:{frontmatter: {published: {eq: true}}}
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`
