import Node from './Node'
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
}

interface PostByTag {
  id: string
  slug: string
  title: string
  date: string
}

export default PageContext
