import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import TagList from '../components/shared/TagList'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <div className="container">
        <div className="box">
          <div className="content">
            <h1 className="title">{post.frontmatter.title}</h1>
            <h4 className="subtitle">{post.frontmatter.date}</h4>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr />
            <TagList tags={post.frontmatter.tags} />
          </div>
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
