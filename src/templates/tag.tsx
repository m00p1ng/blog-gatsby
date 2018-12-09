// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'

import PageProps from '../models/PageProps'

const Tags = ({ pageContext, data }: PageProps) => {
  const { edges } = data.allMarkdownRemark
  const { title } = data.site.siteMetadata
  const { previousPagePath, nextPagePath } = pageContext

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
        {(previousPagePath || nextPagePath) && (
          <Pagination pageContext={pageContext} pathPrefix="/" />
        )}
      </div>
    </Layout>
  )
}

export default Tags

export const query = graphql`
  query TagQuery($tag: String!, $limit: Int!, $skip: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]},
        filter: {frontmatter: {published: {eq: true}, tags: {eq: $tag}}},
        skip: $skip,
        limit: $limit
      ) {
      edges {
        node {
          id
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
