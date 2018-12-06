import AllMarkdownRemark from './AllMarkdownRemark'
import Post from './Post'
import Site from './Site'

interface Data {
  allMarkdownRemark: AllMarkdownRemark
  markdownRemark: Post
  site: Site
}

export default Data
