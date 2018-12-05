import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostPreview from '../components/shared/PostPreview'

const Tags = ({ pageContext, data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout >
      <div className="container">
        <h1 className="title">
          Tag: {pageContext.tag}
        </h1>
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
    </Layout >
  )
}

export default Tags

export const query = graphql`
  query TagsQuery($tag: String!) {
    allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tag}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            tags
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
