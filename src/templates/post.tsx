import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DiscussionEmbed } from 'disqus-react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import Helmet from 'react-helmet'
import readingTime from 'reading-time'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostNavigation from '../components/PostNavigation'
import RecommendedWidget from '../components/RecommendedWidget'
import TagList from '../components/TagList'

import Image from '../models/Image'
import PageProps from '../models/PageProps'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import '../assets/scss/markdown.scss'
import '../assets/scss/post.scss'

const DateWrapper = styled.div`
  margin-top: -1.2rem;
`

const DisqusWrapper = styled.div`
  margin-top: 3rem;
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

interface ImageHeaderProps {
  image: Image
  title: string
}

const ImageHeader = ({ image, title }: ImageHeaderProps) => (
  <div className="card-image">
    <figure className="image">
      <Img
        fluid={image.childImageSharp.fluid}
        alt={title} />
    </figure>
  </div>
)

const DateSubHeader = ({ date, html }: { date: string, html: string }) => {
  const readingStat = readingTime(html)

  return (
    <DateWrapper>
      <span className="icon">
        <CalendarIcon icon="calendar-alt" />
      </span>
      {date}・{readingStat.text}
    </DateWrapper>
  )
}

const Disqus = ({ id, title }: { id: string, title: string }) => {
  const disqusShortname = 'm00p1ng-github-io'
  const disqusConfig = {
    identifier: id,
    title: title,
  }

  return (
    <DisqusWrapper>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig} />
    </DisqusWrapper>
  )
}

const PostTemplate = ({ data, pageContext }: PageProps) => {
  const { post, nextPost, prevPost } = data
  const { title, date, tags, image } = post.frontmatter
  const { siteTitle, recommended, total } = pageContext

  return (
    <Layout>
      <div className="container">
        <Helmet title={`${title} | ${siteTitle}`} />
        <div className="post">
          <div className={`card orange-shadow ${hasImage(image)}`}>
            {image && (
              <ImageHeader image={image} title={title} />
            )}
            <div className="card-content is-medium">
              <h1 className="title is-size-3_5-mobile">{title}</h1>
              <DateSubHeader date={date} html={post.html} />
              <HRLine />
              <div className="content markdown">
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </div>
              <TagList tags={tags} size="is-medium" />
              {total && total >= 3 && (
                <>
                  <PostNavigation nextPost={nextPost} prevPost={prevPost} />
                  <RecommendedWidget recommended={recommended} />
                </>
              )}
              <Disqus id={post.id} title={post.frontmatter.title} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query PostsQuery($slug: String!, $prev: String, $next: String) {
    post: markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
