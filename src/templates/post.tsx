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

import PageProps from '../models/PageProps'
import Image from '../models/Image'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import '../assets/scss/markdown.scss'

const SubheaderWrapper = styled.div`
  margin-top: -1.2rem;
`

const DisqusWrapper = styled.div`
  margin-top: 1.5rem;
`

const CalendarIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

const HRLine = styled.hr`
  background-color: lightgray;
  height: 1px;
`
const hasImage = (image: Image) => {
  if (image) {
    return 'card-image-radius'
  }

  return ''
}

const PostTemplate = ({ data }: PageProps) => {
  const post = data.markdownRemark
  const { title: postTitle, date, tags, image } = post.frontmatter
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
        <div className={`card ${hasImage(image)}`}>
          {image && (
            <div className="card-image">
              <figure className="image">
                <Img
                  fluid={image.childImageSharp.fluid}
                  alt={image.name} />
              </figure>
            </div>
          )}
          <div className="card-content">
            <h1 className="title post-header-mobile">{postTitle}</h1>
            <SubheaderWrapper>
              <CalendarIcon icon="calendar-alt" /> {date}
            </SubheaderWrapper>
            <HRLine />
            <div className="content markdown">
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
            <TagList tags={tags} size="is-medium" />
            <DisqusWrapper>
              <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig} />
            </DisqusWrapper>
          </div>
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
        date(formatString: "MMMM DD, YYYY | HH:mm")
        tags
        image {
          name
          childImageSharp {
            fluid(maxWidth: 960, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
