import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import TagList from '../TagList'

import Post from '../../models/Post'

import '../../assets/scss/postpreview-right.scss'

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
      <div className="postpreview__content">
        <div className="columns">
          {image && (
            <div className="column is-one-third">
              <div className="postpreview__image">
                <figure className="image">
                  <Link to={slug}>
                    <Img
                      fadeIn
                      fluid={image.childImageSharp.fluid}
                      alt={title} />
                  </Link>
                </figure>
              </div>
            </div>
          )}
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
              <p>{description}</p>
              <div className="has-text-right postpreview__readmore" >
                <Link to={slug}>
                  <strong>Read More...</strong>
                </Link>
              </div>
              {tags && (
                <TagList tags={tags} size="postpreview__tag" />
              )}
            </PostContentWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPreview
