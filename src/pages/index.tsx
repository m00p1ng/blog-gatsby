// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'

import PageProps from '../models/PageProps'

const IndexPage = ({ data }: PageProps) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <div className="postpreview-padding">
        {
          edges.map(({ node }) => {
            return <PostPreview key={node.id} post={node} />
          })
        }
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      filter:{frontmatter: {published: {eq: true}}}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            category
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
