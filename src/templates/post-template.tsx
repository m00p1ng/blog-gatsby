import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import TagList from '../components/shared/TagList'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const Post = ({ data }) => {
  const post = data.markdownRemark
  const { title: postTitle, date, tags } = post.frontmatter
  const { title } = data.site.siteMetadata

  return (
    <Layout>
      <Helmet title={`${postTitle} | ${title}`} />
      <div className="container">
        <div className="box">
          <div className="content">
            <h1 className="title">{postTitle}</h1>
            <h4 className="subtitle">{date}</h4>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <TagList tags={tags} />
        </div>
      </div>
    </Layout>
  )
}

export default Post

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
      }
    }
  }
`
