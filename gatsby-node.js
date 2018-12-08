const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')
const { paginate } = require('gatsby-awesome-pagination')

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

  const postTemplate = path.resolve('./src/templates/post.tsx')
  const blogTemplate = path.resolve('./src/templates/blog.tsx')
  const tagTemplate = path.resolve('./src/templates/tag.tsx')
  const categoryTemplate = path.resolve('./src/templates/category.tsx')
  const itemsPerPage = 10;

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
        const posts = result.data.allMarkdownRemark.edges
        posts.forEach(({ node }) => {
          node.frontmatter.tags.forEach((tag) => {
            tags.push(tag);
          })

          categories.push(node.frontmatter.category)

          createPage({
            path: node.fields.slug,
            component: postTemplate,
            context: {
              slug: node.fields.slug
            }
          })
        })

        paginate({
          createPage,
          items: posts,
          itemsPerPage,
          pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? `/` : `/page`),
          component: blogTemplate,
        })

        // Create each tag page
        _.uniq(tags)

        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}`,
            component: tagTemplate,
            context: {
              tag
            }
          })
        })

        // Create each category page
        _.uniq(categories)

        categories.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}`,
            component: categoryTemplate,
            context: {
              category
            }
          })
        })

        resolve()
      })
  })
}