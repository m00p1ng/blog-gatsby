const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')
const {
  createPaginationPages,
  createLinkedPages,
} = require("gatsby-pagination")
const generateRecommendedPost = require('./plugins/gatsby-recommend-story')

const createIndexPaage = ({ createPage, posts, siteTitle, limit }) => {
  const blogTemplate = path.resolve('./src/templates/blog.tsx')

  createPaginationPages({
    createPage,
    edges: posts,
    limit,
    pathFormatter: (pageNumber) => (
      pageNumber === 1 ? '/' : `/page/${pageNumber}`
    ),
    component: blogTemplate,
    context: {
      siteTitle,
    }
  })
}

const createPublishedPage = ({ createPage, posts, siteTitle }) => {
  const postTemplate = path.resolve('./src/templates/post.tsx')
  const RECOMMENDED_LIMIT = 5

  createLinkedPages({
    createPage,
    edges: posts,
    component: postTemplate,
    edgeParser: edge => {
      const {
        fields: { slug },
        frontmatter,
      } = edge.node;

      let recommendedPosts = generateRecommendedPost({
        allPosts: posts,
        post: frontmatter,
        limit: RECOMMENDED_LIMIT,
      })

      let recommendType = 'recommend'
      if (recommendedPosts.length == 0) {
        recommendType = 'latest'
        recommendedPosts = posts.slice(0, RECOMMENDED_LIMIT)
      }

      const recommendResult = recommendedPosts
        .map(({ node }) => ({
          title: node.frontmatter.title,
          slug: node.fields.slug,
          date: node.frontmatter.date,
        }))

      return {
        path: slug,
        context: {
          slug,
          siteTitle,
          recommended: {
            type: recommendType,
            posts: recommendResult,
          },
        },
      }
    },
    circular: true,
  })
}

const getUniqueTag = (posts) => {
  const tags = [];
  posts.forEach(({ node }) => {
    node.frontmatter.tags.forEach((tag) => {
      tags.push(tag);
    })
  })

  return _.uniq(tags)
}

const createTagSimplePage = ({ createPage, posts, siteTitle }) => {
  const tagTemplate = path.resolve('./src/templates/tag-simple.tsx')
  const tags = getUniqueTag(posts)

  tags.forEach(tag => {
    const postByTags = posts
      .filter(({ node }) => (node.frontmatter.tags.includes(tag)))
      .map(({ node }) => ({
        id: node.id,
        slug: node.fields.slug,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
      }))

    createPage({
      path: `/tags/${_.kebabCase(tag)}/all`,
      component: tagTemplate,
      context: {
        tag,
        postByTags,
        siteTitle,
        total: postByTags.length,
      }
    })
  })
}

const createTagPage = ({ createPage, posts, siteTitle, limit }) => {
  const tagTemplate = path.resolve('./src/templates/tag.tsx')
  const tags = getUniqueTag(posts)

  tags.forEach(tag => {
    const postsByTag = posts.filter(({ node }) =>
      (node.frontmatter.tags.includes(tag))
    )

    createPaginationPages({
      createPage,
      edges: postsByTag,
      limit,
      pathFormatter: (pageNumber) => {
        const tagPath = `/tags/${_.kebabCase(tag)}`
        return (
          pageNumber === 1 ? tagPath : `${tagPath}/page/${pageNumber}`
        )
      },
      component: tagTemplate,
      context: {
        siteTitle,
        tag,
      }
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const ITEM_PER_PAGE = 10;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        site {
          siteMetadata {
            title
          }
        }
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
                ISODate: date
                tags
                series
                episode
                description
                image {
                  childImageSharp {
                    fluid(maxWidth: 768, maxHeight: 400, quality: 50, cropFocus: CENTER) {
                      aspectRatio
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

        const siteTitle = result.data.site.siteMetadata.title
        const posts = result.data.allMarkdownRemark.edges

        createIndexPaage({
          createPage,
          posts,
          siteTitle,
          limit: ITEM_PER_PAGE,
        })

        createPublishedPage({
          createPage,
          posts,
          siteTitle,
        })

        createTagSimplePage({
          createPage,
          posts,
          siteTitle,
        })

        createTagPage({
          createPage,
          posts,
          siteTitle,
          limit: ITEM_PER_PAGE,
        })

        resolve()
      })
  })
}

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