const _ = require('lodash')

const getSeries = ({ allPosts, post }) => {
  const postByseries = allPosts.filter(({ node }) => (
    node.frontmatter.series === post.series
  ))
  postByseries.sort((a, b) =>
    a.node.frontmatter.episode - b.node.frontmatter.episode
  )

  const currentEPIndex = postByseries.findIndex(
    x => x.node.frontmatter.episode == post.episode
  )

  if (currentEPIndex == 0) {
    return postByseries.slice(1)
  } else if (currentEPIndex == postByseries.length - 1) {
    return postByseries.slice(0, -1).reverse()
  } else {
    return [
      postByseries[currentEPIndex - 1],
      ...postByseries.slice(currentEPIndex + 1),
      ...postByseries.slice(0, currentEPIndex - 1)
    ]
  }
}

const getRelatedPost = ({ allPosts, post, includedSeries = false }) => {
  const hasRelatedTags = ({ node }) => {
    if (post.title === node.frontmatter.title) {
      return false
    }

    if (
      !includedSeries && post.series !== null &&
      post.series === node.frontmatter.series
    ) {
      return false
    }

    const commonTags = _.intersection(post.tags, node.frontmatter.tags)
    return commonTags.length >= 1
  }

  const diffDate = (a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return Math.abs(dateA - dateB)
  }

  const orderByCommonFirstandDate = (a, b) => {
    const commonTagsA = _.intersection(post.tags, a.node.frontmatter.tags)
    const commonTagsB = _.intersection(post.tags, b.node.frontmatter.tags)
    const dateA = diffDate(a.node.frontmatter.ISODate, post.ISODate)
    const dateB = diffDate(b.node.frontmatter.ISODate, post.ISODate)

    if (commonTagsA.length != commonTagsB.length) {
      return commonTagsB.length - commonTagsA.length
    }

    return dateA - dateB
  }

  const filteredResult = allPosts.filter(hasRelatedTags)
  filteredResult.sort(orderByCommonFirstandDate)

  return filteredResult
}

module.exports = ({ allPosts, post, limit }) => {
  let recommendList = []

  if (post.series !== null) {
    recommendList = getSeries({ allPosts, post })
  }

  if (recommendList.length >= limit) {
    return recommendList.slice(0, limit)
  }
  const remainLimit = limit - recommendList.length
  const relatedPost = getRelatedPost({ allPosts, post })

  recommendList = [
    ...recommendList,
    ...relatedPost.slice(0, remainLimit),
  ]

  return recommendList
}