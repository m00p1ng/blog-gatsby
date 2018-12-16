import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import TagList from '../TagList'

import Post from '../../models/Post'

import '../../assets/scss/postpreview-top.scss'

interface Props {
  post: Post
}

const PostContentWrapper = styled.div`
  margin-top: 1.5rem;
`

const CalendarIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

const DateWrapper = styled.div`
  margin-top: 0.2rem;
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
      {image && (
        <div className="card-image postpreview__image">
          <figure className="image">
            <Link to={slug}>
              <Img
                fadeIn
                fluid={image.childImageSharp.fluid}
                alt={title} />
            </Link>
          </figure>
        </div>
      )}
      <div className="postpreview__content">
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
          <p>{description}</p>
          <div className="has-text-right postpreview__readmore">
            <Link to={slug}>
              <strong>Read More...</strong>
            </Link>
          </div>
        </PostContentWrapper>
        <TagList tags={tags!} size="postpreview__tag" />
      </div>
    </div>
  )
}

export default PostPreview
