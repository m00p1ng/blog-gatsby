import Image from './Image'

interface Frontmatter {
  date: string
  ISODate: string
  title: string
  tags: string[]
  description: string
  image: Image
}

export default Frontmatter
