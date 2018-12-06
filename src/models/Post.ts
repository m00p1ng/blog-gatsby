import Frontmatter from './Frontmatter'

interface Post {
  fields: {
    slug: string
  }
  id: number
  excerpt: string
  html: string
  frontmatter: Frontmatter
}

export default Post
