import Node from './Node'

interface AllMarkdownRemark {
  totalCount?: number
  edges?: Node[]
  group?: Group[]
}

interface Group {
  field?: string
  fieldValue?: string
  totalCount?: number
}

export default AllMarkdownRemark
