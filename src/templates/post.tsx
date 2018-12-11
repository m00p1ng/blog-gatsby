// @ts-ignore
import { graphql, Link } from 'gatsby'
// @ts-ignore
import Img from 'gatsby-image'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
// @ts-ignore
import { DiscussionEmbed } from 'disqus-react'
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/Layout'
import TagList from '../components/TagList'
import PostNavigation from '../components/PostNavigation'

import PageProps from '../models/PageProps'
import Image from '../models/Image'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import '../assets/scss/markdown.scss'
import '../assets/scss/post.scss'

const DateWrapper = styled.div`
  margin-top: -1.2rem;
`

const DisqusWrapper = styled.div`
  margin-top: 1.5rem;
`

const CalendarIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

const HRLine = styled.hr`
  background-color: rgba(0, 0, 0, 0.075);
  height: 3px;
`
const hasImage = (image: Image) => (
  image ? 'post__remove-image-radius' : ''
)

const PostTemplate = ({ data, pageContext }: PageProps) => {
  const { post, nextPost, prevPost } = data
  const { title, date, tags, image } = post.frontmatter
  const { siteTitle } = pageContext

  const disqusShortname = 'm00p1ng-github-io'
  const disqusConfig = {
    identifier: post.id,
    title: post.frontmatter.title,
  }

  return (
    <Layout>
      <div className="container">
        <Helmet title={`${title} | ${siteTitle}`} />
        <div className="post">
          <div className={`card ${hasImage(image)}`}>
            {image && (
              <div className="card-image">
                <figure className="image">
                  <Img
                    fluid={image.childImageSharp.fluid}
                    alt={title} />
                </figure>
              </div>
            )}
            <div className="card-content">
              <h1 className="title post__header-mobile">{title}</h1>
              <DateWrapper>
                <span className="icon">
                  <CalendarIcon icon="calendar-alt" />
                </span>
                {date}
              </DateWrapper>
              <HRLine />
              <div className="content markdown">
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </div>
              <TagList tags={tags} size="is-medium" />
              <PostNavigation nextPost={nextPost} prevPost={prevPost} />
              <DisqusWrapper>
                <DiscussionEmbed
                  shortname={disqusShortname}
                  config={disqusConfig} />
              </DisqusWrapper>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query PostsQuery($slug: String!, $prev: String!, $next: String!) {
    post: markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY | HH:mm")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 960, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    prevPost: markdownRemark(fields: { slug: { eq: $prev } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    nextPost: markdownRemark(fields: { slug: { eq: $next } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
