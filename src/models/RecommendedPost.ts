interface RecommendedPost {
  type: string
  posts: {
    title: string
    slug: string
    date: string
  }[]
}

export default RecommendedPost
