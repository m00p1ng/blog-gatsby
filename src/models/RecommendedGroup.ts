import RecommendedPost from './RecommendedPost'

interface RecommendedGroup {
  latest?: RecommendedPost
  tags?: RecommendedPost
  series?: RecommendedPost
}

export default RecommendedGroup
