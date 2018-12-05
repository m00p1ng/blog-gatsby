import React from 'react'
import { Link, graphql } from 'gatsby'
import * as _ from 'lodash'

import Layout from '../components/Layout'

const AllTagsPage = ({ data }) => {
  let tags: string[] = []

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    tags.push(...node.frontmatter.tags)
  })

  tags = _.uniq(tags)
  tags.sort()

  return (
    <Layout>
      <div className="container">
        <div className="box">
          <h1 className="title">Tags</h1>
          <hr />
          <div className="content">
            <ul>
              {tags.map((tag, index) => (
                <li key={index} className="is-size-5">
                  <Link to={`/tags/${tag}`}>
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AllTagsPage

export const query = graphql`
  query AllTagsQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
