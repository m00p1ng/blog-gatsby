import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostPreview from '../components/shared/PostPreview'

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <div className="container">
        {
          edges.map(({ node }) => {
            return (
              <PostPreview
                key={node.id}
                post={node}
                slug={node.fields.slug} />
            )
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
