// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'
import KebabCase from 'lodash/kebabCase'
import styled from 'styled-components'

import TagList from './TagList'

import Post from '../../models/Post'

interface Props {
  post: Post
}

const PostContentWrapper = styled.div`
  padding-top: 0.5rem;
`

const PostPreview = ({ post }: Props) => {
  const { title, date, description, tags, category } = post.frontmatter
  const { slug } = post.fields

  return (
    <div className="box box-padding box-radius grow">
      <p>
        <Link to={`/categories/${KebabCase(category)}`}>{category}</Link> | {date}
      </p>
      <h1 className="title postpreview-header is-size-4-mobile">
        <Link to={post.fields.slug}>
          {title}
        </Link>
      </h1>
      <PostContentWrapper>
        <p>{description}</p>
        <div className="has-text-right">
          <Link to={slug}>
            <strong>Read More...</strong>
          </Link>
        </div>
      </PostContentWrapper>
      <div className="is-hidden-mobile">
        <TagList tags={tags} />
      </div>
    </div>
  )
}

export default PostPreview
