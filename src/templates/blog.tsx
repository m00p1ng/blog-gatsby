// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'

import PageProps from '../models/PageProps'

const IndexPage = ({ pageContext, data }: PageProps) => {
  const { edges } = data.allMarkdownRemark
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <Layout>
      <div className="postpreview-padding">
        {
          edges.map(({ node }) => {
            return <PostPreview key={node.id} post={node} />
          })
        }
        {(previousPagePath || nextPagePath) && (
          <Pagination pageContext={pageContext} pathPrefix="/" />
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      filter:{frontmatter: {published: {eq: true}}},
      skip: $skip,
      limit: $limit
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            description
            image {
              childImageSharp {
                fluid(maxWidth: 960, maxHeight: 500, quality: 50, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
