// @ts-ignore
import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
// @ts-ignore
import { DiscussionEmbed } from 'disqus-react'

import Layout from '../components/Layout'
import TagList from '../components/TagList'

import PageProps from '../models/PageProps'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import '../assets/scss/markdown.scss'

const SubheaderWrapper = styled.div`
  margin-top: -1.2rem;
`

const DisqusWrapper = styled.div`
  margin-top: 1.5rem;
`

const PostTemplate = ({ data }: PageProps) => {
  const post = data.markdownRemark
  const { title: postTitle, date, tags } = post.frontmatter
  const { title } = data.site.siteMetadata
  const disqusShortname = 'm00p1ng-github-io'
  const disqusConfig = {
    identifier: post.id,
    title: post.frontmatter.title,
  }

  return (
    <Layout>
      <Helmet title={`${postTitle} | ${title}`} />
      <div className="post-padding">
        <div className="box box-padding box-radius">
          <h1 className="title post-header-mobile">{postTitle}</h1>
          <SubheaderWrapper>
            {date}
          </SubheaderWrapper>
          <hr style={{ backgroundColor: 'lightgrey', height: '1px' }} />
          <div className="content markdown">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          <TagList tags={tags} size="is-medium" />
          <DisqusWrapper>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </DisqusWrapper>
        </div>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query PostsQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
