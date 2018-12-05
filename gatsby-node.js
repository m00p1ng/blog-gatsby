const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('underscore')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'src/content'
    });

    const parseFolderName = (name) => {
      const [date, postName] = name.split('___');
      const dateFormat = date.replace(/-/g, "/")
      return `${dateFormat}/${postName}`
      // return postName.toLowerCase()
    }

    createNodeField({
      node,
      name: 'slug',
      value: parseFolderName(slug)
    });
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const tags = []

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          filter: {frontmatter: {published: {eq:true}}}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `)
      .then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          node.frontmatter.tags.forEach((tag) => {
            tags.push(tag);
          });

          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/Post.tsx'),
            context: {
              slug: node.fields.slug
            }
          })
        })

        _.uniq(tags)

        tags.forEach(tag => {
          createPage({
            path: `/tags/${tag}`,
            component: path.resolve('./src/templates/Tag.tsx'),
            context: {
              tag
            }
          })
        })

        resolve()
      })
  })
}