// @ts-ignore
import { Link } from 'gatsby'
// @ts-ignore
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TagList from './TagList'

import Post from '../models/Post'

interface Props {
  post: Post
}

const PostContentWrapper = styled.div`
  padding-top: 1.5rem;
`

const CalendarIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`

const DateWrapper = styled.p`
  margin-top: 0.2rem;
`

const ImageHeader = styled(Img)`
  margin-bottom: 1rem;
`

const PostPreview = ({ post }: Props) => {
  const { title, date, description, tags, image } = post.frontmatter
  const { slug } = post.fields

  return (
    <div className="box grow">
      {image && (
        <Link to={post.fields.slug}>
          <ImageHeader
            fluid={image.childImageSharp.fluid}
            alt={image.name} />
        </Link>
      )}
      <h1 className="title postpreview-header is-size-4-mobile">
        <Link to={post.fields.slug}>
          {title}
        </Link>
      </h1>
      <DateWrapper>
        <CalendarIcon icon="calendar-alt" />
        {date}
      </DateWrapper>
      <PostContentWrapper>
        <p>{description}</p>
        <div className="has-text-right readmore-padding">
          <Link to={slug}>
            <strong>Read More...</strong>
          </Link>
        </div>
      </PostContentWrapper>
      <TagList tags={tags} size="tag-size" />
    </div>
  )
}

export default PostPreview
