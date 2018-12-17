const getSeries = (allPosts, post) => {
  const postByseries = allPosts.filter(({ node }) => (
    node.frontmatter.series === post.series
  ))
  postByseries.sort((a, b) =>
    a.node.frontmatter.episode - b.node.frontmatter.episode
  )

  return postByseries
}

const calculateRecommendList = (posts, curEP) => {
  if (curEP == 0) {
    return posts.slice(1)
  } else if (curEP == posts.length - 1) {
    return posts.slice(0, -1).reverse()
  } else {
    return [
      posts[curEP - 1],
      ...posts.slice(curEP + 1),
      ...posts.slice(0, curEP - 1)
    ]
  }
}

const seriesRelated = ({ allPosts, post, limit = 100 }) => {
  if (post.series == null) {
    return []
  }

  const postByseries = getSeries(allPosts, post)
  const currentEPIndex = postByseries.findIndex(
    x => x.node.frontmatter.episode == post.episode
  )
  return calculateRecommendList(postByseries, currentEPIndex).slice(0, limit)
}

module.exports = seriesRelated 