import { graphql, Link } from 'gatsby';
import * as React from 'react'
import Layout from '../components/Layout'

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <div className="container">
        <h3 className="title is-3">Post</h3>
        {
          edges.map(({ node }) => {
            const post = node
            return (
              <div key={post.id}>
                <Link to={node.fields.slug}><h4 className="title is-4 is-link">{post.frontmatter.title}</h4></Link>
                <h6 className="subtitle is-6">{post.frontmatter.date}</h6>
                <p>{post.frontmatter.description}</p>
                <div className="tags">
                  {post.frontmatter.tags.map((tag, index) => (
                    <Link className="tag is-info is-small" to={`/tags/${tag}`} key={index}>
                      {tag}
                    </Link>
                  ))}
                </div>
                <hr />
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: {
        order: DESC,
        fields: [frontmatter___date]
      },
      filter:{
        frontmatter: {
          published: {
            eq: true
          }
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`