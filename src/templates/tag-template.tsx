// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostPreview from '../components/shared/PostPreview'

import PageProps from '../models/PageProps'

const Tags = ({ pageContext, data }: PageProps) => {
  const { edges } = data.allMarkdownRemark
  const { title } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`${pageContext.tag} | ${title}`} />
      <div className="container">
        <h1 className="title">
          Tag: {pageContext.tag}
        </h1>
        {
          edges.map(({ node }) => {
            return <PostPreview key={node.id} post={node} />
          })
        }
      </div>
    </Layout>
  )
}

export default Tags

export const query = graphql`
  query TagQuery($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      filter: {frontmatter: {tags: {eq: $tag}}}) {
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
