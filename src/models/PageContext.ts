import Post from './Post'
import RecommendedPost from './RecommendedPost'

interface PageContext {
  tag?: string
  siteTitle?: string
  // tslint:disable-next-line:no-any
  posts: any
  recommended: RecommendedPost

  next: string
  prev: string
  total: number
  page: number
  pages: number
  nodes: Node[]
}

interface Node {
  node: Post
}

export default PageContext
