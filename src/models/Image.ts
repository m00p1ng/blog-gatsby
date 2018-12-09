import ImageSharp from './ImageSharp'

interface Image {
  childImageSharp: {
    sizes: ImageSharp
    fluid: ImageSharp
  }
  name: string
}

export default Image
