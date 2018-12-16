import Post from './Post'

interface AllMarkdownRemark {
  totalCount: number
  edges: Node[]
  group: Group[]
}

interface Group {
  field: string
  fieldValue: string
  totalCount: number
}

interface Node {
  node: Post
}

export default AllMarkdownRemark
