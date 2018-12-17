const _ = require('lodash')

const diffDate = (a, b) => {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  return Math.abs(dateA - dateB)
}

const orderByCommonFirstandDate = (post) => (a, b) => {
  const commonTagsA = _.intersection(post.tags, a.node.frontmatter.tags)
  const commonTagsB = _.intersection(post.tags, b.node.frontmatter.tags)
  const dateA = diffDate(a.node.frontmatter.ISODate, post.ISODate)
  const dateB = diffDate(b.node.frontmatter.ISODate, post.ISODate)

  if (commonTagsA.length != commonTagsB.length) {
    return commonTagsB.length - commonTagsA.length
  }

  return dateA - dateB
}

const hasRelatedTags = (includedSeries, post) => ({ node }) => {
  if (post.title === node.frontmatter.title) {
    return false
  }

  if (
    !includedSeries &&
    post.series !== null &&
    post.series === node.frontmatter.series
  ) {
    return false
  }

  const commonTags = _.intersection(post.tags, node.frontmatter.tags)
  return commonTags.length >= 1
}

const tagRelated = ({ allPosts, post, includedSeries = false }) => {
  const filteredResult = allPosts.filter(hasRelatedTags(includedSeries, post))
  filteredResult.sort(orderByCommonFirstandDate(post))

  return filteredResult
}

module.exports = tagRelated
