const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')

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
      return `${dateFormat}/${_.kebabCase(postName)}`
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
  const categories = []

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
                category
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
          })

          categories.push(node.frontmatter.category)

          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/post-template.tsx'),
            context: {
              slug: node.fields.slug
            }
          })
        })

        _.uniq(tags)

        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}`,
            component: path.resolve('./src/templates/tag-template.tsx'),
            context: {
              tag
            }
          })
        })

        _.uniq(categories)

        categories.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}`,
            component: path.resolve('./src/templates/category-template.tsx'),
            context: {
              category
            }
          })
        })

        resolve()
      })
  })
}