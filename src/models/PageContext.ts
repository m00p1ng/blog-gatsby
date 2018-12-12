import Post from './Post'

interface PageContext {
  tag?: string
  siteTitle: string
  // tslint:disable-next-line:no-any
  posts?: any

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
