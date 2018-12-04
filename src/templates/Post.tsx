import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="container">
        <h1 className="title is-1">{post.frontmatter.title}</h1>
        <h4 className="subtitle is-3">{post.frontmatter.date}</h4>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.html}
        <div className="tags">
          {post.frontmatter.tags.map((tag, index) => (
            <Link className="tag is-info is-small" to={`/tags/${tag}`} key={index}>
              {tag}
            </Link>
          ))}
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