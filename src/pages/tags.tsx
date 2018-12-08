// @ts-ignore
import { Link, graphql } from 'gatsby'
import React from 'react'
import KebabCase from 'lodash/kebabCase'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'

import PageProps from '../models/PageProps'

interface TagGroup {
  fieldValue: string
  totalCount: number
}

const TagsPage = ({ data }: PageProps) => {
  const { title } = data.site.siteMetadata
  const tags: TagGroup[] = data.allMarkdownRemark.group

  return (
    <Layout>
      <Helmet title={`All Tags | ${title}`} />
      <div className="postpreview-padding">
        <h1 className="title has-text-white">All Tags</h1>
        <div className="box box-radius">
          <div className="content is-medium">
            <ul>
              {tags.map(tag => (
                <li key={tag.fieldValue}>
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

export default TagsPage

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
