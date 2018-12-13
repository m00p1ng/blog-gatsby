// @ts-ignore
import { GatsbyImageProps } from 'gatsby-image'

interface Frontmatter {
  date: string
  title: string
  tags: string[]
  description: string
  image: GatsbyImageProps
}

export default Frontmatter
