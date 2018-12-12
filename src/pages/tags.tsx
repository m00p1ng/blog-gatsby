// @ts-ignore
import { Link, graphql } from 'gatsby'
import React from 'react'
import KebabCase from 'lodash/kebabCase'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Banner from '../components/Banner'

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
      <Banner
        title="All Tags"
        subtitle={`Total ${tags.length} tag${tags.length !== 1 ? 's' : ''}`}
      />
      <div className="container">
        <Helmet title={`All Tags | ${title}`} />
        <div className="blog-container">
          <div className="tags">
            {tags.map((tag) => (
              <Link
                key={tag}
                className="tag is-link is-medium"
                to={`/tags/${KebabCase(tag.fieldValue)}`}
              >
                {tag.fieldValue} ({tag.totalCount})
            </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout >
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
