// @ts-ignore
import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import KebabCase from 'lodash/kebabCase'

import Layout from '../components/Layout'
import TagList from '../components/shared/TagList'

import PageProps from '../models/PageProps'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'

const PostTemplate = ({ data }: PageProps) => {
  const post = data.markdownRemark
  const { title: postTitle, date, tags, category } = post.frontmatter
  const { title } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`${postTitle} | ${title}`} />
      <div className="container">
        <div className="box">
          <h1 className="title">{postTitle}</h1>
          <h6 className="subtitle">
            <Link to={`/categories/${KebabCase(category)}`}>{category}</Link> | {date}
          </h6>
          <div className="content">
            <hr />
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <TagList tags={tags} />
        </div>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        category
      }
    }
  }
`
