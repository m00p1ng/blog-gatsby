import Image from './Image'

interface Frontmatter {
  date: string
  title: string
  tags: string[]
  description: string
  image: Image
}

export default Frontmatter
