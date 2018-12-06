import Post from './Post'

interface AllMarkdownRemark {
  totalCount: number
  edges: { node: Post }[]
  // tslint:disable-next-line:no-any
  group?: any
}

export default AllMarkdownRemark
