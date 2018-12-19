import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import TagList from '../TagList'

import Data from '../../models/Data'
import Image from '../../models/Image'
import Post from '../../models/Post'

import '../../assets/scss/postpreview-left.scss'

interface Props {
  post: Post
}

const PostContentWrapper = styled.div`
  margin: 1rem 0;
`

const ContentWrapper = styled.div.attrs({
  className: 'columns'
})`
  align-items: center;
`

const CalendarIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

const DateWrapper = styled.div`
  margin-top: 0.2rem;
`

interface RenderImageProps {
  image?: Image
  data: Data
  slug: string
  title?: string
}

const renderImage = ({ image, data, slug, title }: RenderImageProps) => {
  const hasImage = (image?: Image) => (
    image ? '' : 'is-hidden-mobile'
  )

  return (
    <div className={`column is-half-desktop is-5-tablet ${hasImage(image)}`}>
      <div className="postpreview__image">
        <figure className="image">
          <Link to={slug}>
            <Img
              fadeIn
              fluid={
                image ?
                  image.childImageSharp.fluid :
                  data.defaultImage!.childImageSharp.fluid
              }
              alt={title} />
          </Link>
        </figure>
      </div>
    </div>
  )
}

const defaultImageQuery = graphql`
  query {
    defaultImage: file(relativePath: { eq: "m00p1ng-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 768, maxHeight: 400, quality: 60, cropFocus: CENTER) {
          aspectRatio
          base64
          sizes
          src
          srcSet
          srcWebp
          srcSetWebp
        }
      }
    }
  }
`

const PostPreview = ({ post }: Props) => {
  const { slug } = post.fields!
  const {
    title,
    date,
    description,
    tags,
    image
  } = post.frontmatter!

  return (
    <div className="card grow postpreview">
      <div className="postpreview__content">
        <ContentWrapper>
          <StaticQuery
            query={defaultImageQuery}
            render={(data: Data) => renderImage({ image, data, slug, title })}
          />
          <div className="column">
            <h1 className="title postpreview__header is-4">
              <Link to={slug}>
                {title}
              </Link>
            </h1>
            <DateWrapper>
              <span className="icon">
                <CalendarIcon icon="calendar-alt" size="sm" />
              </span>
              {date}
            </DateWrapper>
            <PostContentWrapper>
              {description}
            </PostContentWrapper>
            {tags && (
              <TagList tags={tags} size="postpreview__tag" />
            )}
          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}

export default PostPreview
