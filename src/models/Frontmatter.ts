import Image from './Image'

interface Frontmatter {
  date?: string
  ISODate?: string
  shortDate?: string
  title?: string
  tags?: string[]
  description?: string
  image?: Image
}

export default Frontmatter
