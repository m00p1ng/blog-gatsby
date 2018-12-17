import AllMarkdownRemark from './AllMarkdownRemark'
import Image from './Image'
import Post from './Post'
import PostPage from './PostPage'
import Site from './Site'

interface Data {
  allMarkdownRemark?: AllMarkdownRemark
  markdownRemark?: Post
  site?: Site

  post?: Post
  nextPost?: PostPage
  prevPost?: PostPage

  defaultImage?: Image
}

export default Data
