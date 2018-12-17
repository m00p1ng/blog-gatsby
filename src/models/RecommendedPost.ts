import Image from './Image'
interface RecommendedPost {
  posts: PostRecommend[]
}

interface PostRecommend {
  title: string
  slug: string
  date: string
  image: Image
}

export default RecommendedPost
