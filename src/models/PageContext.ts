import Post from './Post'

interface PageContext {
  tag?: string
  siteTitle: string

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
