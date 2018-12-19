const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')
const {
  createPaginationPages,
  createLinkedPages,
} = require("gatsby-pagination")
const {
  seriesRelated,
  tagRelated,
} = require('./plugins/gatsby-related-story')

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
  const RECOMMENDED_LIMIT = 6

  const filterField = (posts) => posts
    .map(({ node }) => ({
      title: node.frontmatter.title,
      slug: node.fields.slug,
      date: node.frontmatter.date,
      image: node.frontmatter.image,
    }))
  const latestPost = filterField(posts.slice(0, RECOMMENDED_LIMIT))

  createLinkedPages({
    createPage,
    edges: posts,
    component: postTemplate,
    edgeParser: edge => {
      const {
        fields: { slug },
        frontmatter,
      } = edge.node;

      const relatedSeriesList = seriesRelated({
        allPosts: posts,
        post: frontmatter,
        limit: RECOMMENDED_LIMIT,
      })

      const relatedTagList = tagRelated({
        allPosts: posts,
        post: frontmatter,
        limit: RECOMMENDED_LIMIT,
      })

      let recommended = {}

      if (relatedSeriesList.length != 0) {
        recommended['series'] = {
          posts: filterField(relatedSeriesList)
        }
      }

      if (relatedTagList.length != 0) {
        recommended['tags'] = {
          posts: filterField(relatedTagList)
        }
      }

      if (relatedSeriesList.length > 3) {

      } else if (relatedTagList.length > 3) {

      } else if (relatedSeriesList.length == 0 && relatedTagList.length == 0) {
        recommended['latest'] = {
          posts: latestPost
        }
      } else if (relatedSeriesList.length == 0 || relatedTagList.length == 0) {
        recommended['latest'] = {
          posts: latestPost.slice(0, 3)
        }
      }

      return {
        path: slug,
        context: {
          slug,
          siteTitle,
          recommended,
        },
      }
    },
    circular: true,
  })
}

const getUniqueTag = (posts) => {
  const tags = [];
  posts.forEach(({ node }) => {
    if (node.frontmatter.tags === null) {
      return
    }

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
      .filter(({ node }) => (
        node.frontmatter.tags && node.frontmatter.tags.includes(tag))
      )
      .map(({ node }) => ({
        id: node.id,
        slug: node.fields.slug,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
      }))

    createPage({
      path: `/tags/${_.kebabCase(tag)}/list`,
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
      (node.frontmatter.tags && node.frontmatter.tags.includes(tag))
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

/////////////////////////
// TODO: Need Refactor //
/////////////////////////
const createDatePage = ({ createPage, posts, siteTitle }) => {
  const dateTemplate = path.resolve('./src/templates/date.tsx')
  const filterFieldPost = posts.map(({ node }) => ({
    id: node.id,
    slug: node.fields.slug,
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    ISODate: node.frontmatter.ISODate,
    shortDate: node.frontmatter.shortDate,
  }))

  const groupYear = _.groupBy(filterFieldPost, (post) => (
    post.ISODate.slice(0, 4)
  ))

  Object.keys(groupYear).map((year) => {
    createPage({
      path: `/${year}`,
      component: dateTemplate,
      context: {
        siteTitle,
        dateType: "year",
        date: year,
        total: groupYear[year].length,
        postByDate: groupYear[year],
      }
    })

    // Generate Month Page
    const groupYearMonth = _.groupBy(groupYear[year], (post) => (
      post.ISODate.slice(0, 7)
    ))
    Object.keys(groupYearMonth).map((date) => {
      const [year, month] = date.split('-')

      createPage({
        path: `/${year}/${month}`,
        component: dateTemplate,
        context: {
          siteTitle,
          dateType: "month",
          date,
          total: groupYearMonth[date].length,
          postByDate: groupYearMonth[date],
        }
      })

      const groupYearMonthDay = _.groupBy(filterFieldPost, (post) => (
        post.ISODate.slice(0, 10)
      ))

      // Generate Day Page
      Object.keys(groupYearMonthDay).map((date) => {
        const [year, month, day] = date.split('-')

        createPage({
          path: `/${year}/${month}/${day}`,
          component: dateTemplate,
          context: {
            siteTitle,
            dateType: "day",
            date,
            total: groupYearMonthDay[date].length,
            postByDate: groupYearMonthDay[date],
          }
        })
      })
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
                shortDate: date(formatString: "MMM, DD, YY")
                tags
                series
                episode
                description
                image {
                  childImageSharp {
                    fluid(maxWidth: 768, maxHeight: 400, quality: 50, cropFocus: CENTER) {
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

        createDatePage({
          createPage,
          posts,
          siteTitle,
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