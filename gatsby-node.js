const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')
const {
  createPaginationPages,
  createLinkedPages,
} = require("gatsby-pagination");

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

  const postTemplate = path.resolve('./src/templates/post.tsx')
  const blogTemplate = path.resolve('./src/templates/blog.tsx')
  const tagTemplate = path.resolve('./src/templates/tag.tsx')
  const itemsPerPage = 10;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: {order: DESC, fields: [frontmatter___date]},
          filter: {frontmatter: {published: {eq:true}}}
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                tags
                description
                image {
                  childImageSharp {
                    fluid(maxWidth: 960, maxHeight: 500, quality: 50, cropFocus: CENTER) {
                      aspectRatio
                      base64
                      sizes
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()));
          reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges
        posts.forEach(({ node }) => {
          node.frontmatter.tags.forEach((tag) => {
            tags.push(tag);
          })

          createLinkedPages({
            createPage,
            edges: posts,
            component: postTemplate,
            edgeParser: edge => {
              const {
                fields: { slug },
              } = edge.node;
              return {
                path: slug,
                context: {
                  slug,
                },
              };
            },
            circular: true,
          })
        })

        createPaginationPages({
          createPage,
          edges: posts,
          limit: itemsPerPage,
          pathFormatter: (pageNumber) => pageNumber === 1 ? '/' : `/page/${pageNumber}`,
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
        resolve()
      })
  })
}