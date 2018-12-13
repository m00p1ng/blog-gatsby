import AllMarkdownRemark from './AllMarkdownRemark'
import Page from './Page'
import Post from './Post'
import Site from './Site'

interface Data {
  allMarkdownRemark: AllMarkdownRemark
  markdownRemark: Post
  post: Post
  site: Site
  nextPost: Page
  prevPost: Page
}

export default Data
