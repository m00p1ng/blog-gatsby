import Node from './Node'
import PostByDate from './PostByDate'
import PostByTag from './PostByTag'
import RecommendedGroup from './RecommendedGroup'

interface PageContext {
  tag?: string
  siteTitle?: string
  postByTags?: PostByTag[]
  recommended?: RecommendedGroup
  slug?: string

  next?: string
  prev?: string
  total?: number
  page?: number
  pages?: number
  nodes?: Node[]

  postByDate?: PostByDate[]
  dateType?: string
  date?: string
}

export default PageContext
