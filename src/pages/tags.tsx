import React from 'react'
import { Link, graphql } from 'gatsby'
import KebabCase from 'lodash/kebabCase'

import Layout from '../components/Layout'

const AllTagsPage = ({ data }) => {
  const { title } = data.site.siteMetadata
  const tags = data.allMarkdownRemark.group

  return (
    <Layout>
      <div className="container">
        <div className="box">
          <h1 className="title">Tags</h1>
          <hr />
          <div className="content">
            <ul>
              {tags.map(tag => (
                <li key={tag.fieldValue} className="is-size-5">
                  <Link to={`/tags/${KebabCase(tag.fieldValue)}`}>
                    {tag.fieldValue} ({tag.totalCount})
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
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter:{frontmatter: {published: {eq: true}}}
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
