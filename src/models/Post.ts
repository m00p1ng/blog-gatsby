import Frontmatter from './Frontmatter'

interface Post {
  fields: {
    slug: string
  }
  id: string
  excerpt: string
  html: string
  frontmatter: Frontmatter
}

export default Post
