import AllMarkdownRemark from './AllMarkdownRemark'
import Post from './Post'
import Page from './Page'
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
