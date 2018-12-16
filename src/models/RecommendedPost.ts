interface RecommendedPost {
  type: string
  posts: PostRecommend[]
}

interface PostRecommend {
  title: string
  slug: string
  date: string
}

export default RecommendedPost
