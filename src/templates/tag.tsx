// @ts-ignore
import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'

import PageProps from '../models/PageProps'

const TagWrapper = styled.li`
  margin-bottom: 0.5rem;
`

const Tags = ({ pageContext, data }: PageProps) => {
  const { edges } = data.allMarkdownRemark
  const { title } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`#${pageContext.tag} | ${title}`} />
      <div className="postpreview-padding">
        <h1 className="title has-text-white">
          # {pageContext.tag}
        </h1>
        <div className="box">
          <div className="content is-medium">
            <ul>
              {
                edges.map(({ node }) => {
                  return (
                    <Link key={node.id} to={node.fields.slug}>
                      <TagWrapper>
                        {node.frontmatter.title}
                      </TagWrapper>
                    </Link>
                  )
                })
              }
            </ul>
          </div>
        </div>
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
        filter: {frontmatter: {published: {eq: true}, tags: {eq: $tag}}}
      ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
