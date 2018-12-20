import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import Helmet from 'react-helmet'
import readingTime from 'reading-time'
import styled from 'styled-components'

import DisqusWidget from '../components/DisqusWidget'
import Layout from '../components/Layout'
import PostNavigation from '../components/PostNavigation'
import RecommendedWidget from '../components/RecommendedWidget'
import SEOHelmet from '../components/SEOHelmet'
import SocialShareWidget from '../components/SocialShareWidget'
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

const DateSubHeader = ({ date, html }: { date: string, html: string }) => (
  <DateWrapper>
    <span className="icon">
      <CalendarIcon icon="calendar-alt" />
    </span>
    {date}・{readingTime(html).text}
  </DateWrapper>
)

const PostTemplate = ({ data, pageContext }: PageProps) => {
  const { post, nextPost, prevPost, site } = data!
  const { date, tags, image, title } = post!.frontmatter!
  const { siteTitle, recommended, total, slug } = pageContext!
  const { url } = site!.siteMetadata
  const siteTitleName = `${title} | ${siteTitle}`

  return (
    <Layout>
      <div className="container">
        <Helmet title={siteTitleName} />
        <SEOHelmet
          post={post!}
          site={site!}
          siteTitle={siteTitleName}
          slug={slug!}
        />
        <div className="post">
          <div className={`card orange-shadow ${hasImage(image!)}`}>
            {image && (
              <ImageHeader image={image} title={title!} />
            )}
            <div className="page-content is-medium">
              <h1 className="title is-size-3_5-mobile">{title}</h1>
              <DateSubHeader date={date!} html={post!.html!} />
              <HRLine />
              <div
                className="content markdown"
                dangerouslySetInnerHTML={{ __html: post!.html! }}
              />
              {tags && (
                <TagList tags={tags} size="is-medium" />
              )}
              <SocialShareWidget url={`${url}${slug}`} tags={tags} title={title!} />
              {total && total >= 3 && (
                <PostNavigation nextPost={nextPost} prevPost={prevPost} />
              )}
            </div>
            {total && total >= 3 && (
              <div className="post-recommend">
                <RecommendedWidget recommendedGroup={recommended!} />
              </div>
            )}
            <DisqusWidget
              config={{
                id: post!.id!,
                title: title!,
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query PostsQuery($slug: String!, $prev: String, $next: String) {
    site {
      siteMetadata {
        url
      }
    }
    post: markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        ISODate: date
        tags
        description
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
