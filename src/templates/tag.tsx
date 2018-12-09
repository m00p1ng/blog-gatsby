// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'

import PageProps from '../models/PageProps'

const Tags = ({ pageContext, data }: PageProps) => {
  const { edges } = data.allMarkdownRemark
  const { title } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`#${pageContext.tag} | ${title}`} />
      <div className="postpreview-padding">
        <h1 className="title has-text-white">
          #{pageContext.tag}
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
      filter: {frontmatter: {published: {eq: true}, tags: {eq: $tag}}}) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            category
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
