import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import TagList from '../components/shared/TagList'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default ({ data }) => {
  const post = data.markdownRemark
  const { title, date, tags } = post.frontmatter

  return (
    <Layout>
      <div className="container">
        <div className="box">
          <div className="content">
            <h1 className="title">{title}</h1>
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

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
