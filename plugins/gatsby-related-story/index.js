const seriesRelated = require('./series-related')
const tagRelated = require('./tag-related')

const recommendedRelated = ({ allPosts, post, limit }) => {
  let recommendList = []

  if (post.series !== null) {
    recommendList = seriesRelated({ allPosts, post })
  }

  if (recommendList.length >= limit) {
    return recommendList.slice(0, limit)
  }
  const remainLimit = limit - recommendList.length
  const relatedPost = tagRelated({ allPosts, post })

  recommendList = [
    ...recommendList,
    ...relatedPost.slice(0, remainLimit),
  ]

  return recommendList
}

module.exports = recommendedRelated
exports = {
  seriesRelated,
  tagRelated,
}