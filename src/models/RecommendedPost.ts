interface RecommendedPost {
  type: string
  posts: Post[]
}

interface Post {
  title: string
  slug: string
  date: string
}

export default RecommendedPost
