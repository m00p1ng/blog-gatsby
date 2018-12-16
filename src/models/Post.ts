import Fields from './Fields'
import Frontmatter from './Frontmatter'

interface Post {
  fields?: Fields
  id?: string
  html?: string
  frontmatter?: Frontmatter
}

export default Post
