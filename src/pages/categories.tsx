// @ts-ignore
import { Link, graphql } from 'gatsby'
import React from 'react'
import KebabCase from 'lodash/kebabCase'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'

import PageProps from '../models/PageProps'

interface CategoryGroup {
  fieldValue: string
  totalCount: number
}

const CategoriesPage = ({ data }: PageProps) => {
  const { title } = data.site.siteMetadata
  const categories: CategoryGroup[] = data.allMarkdownRemark.group

  return (
    <Layout>
      <Helmet title={`All Categories | ${title}`} />
      <div className="box">
        <h1 className="title">Categories</h1>
        <hr />
        <div className="content">
          <ul>
            {categories.map(category => (
              <li key={category.fieldValue}>
                <Link to={`/categories/${KebabCase(category.fieldValue)}`}>
                  {category.fieldValue} ({category.totalCount})
                  </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default CategoriesPage

export const query = graphql`
  query CategoriesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter:{frontmatter: {published: {eq: true}}}
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
