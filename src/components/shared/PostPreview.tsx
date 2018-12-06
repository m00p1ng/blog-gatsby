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
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`

const PostPreview = ({ post }: Props) => {
  const { title, date, description, tags, category } = post.frontmatter
  const { slug } = post.fields

  return (
    <div className="box" style={{ padding: '2rem' }}>
      <p className="">
        <Link to={`/categories/${KebabCase(category)}`}>{category}</Link> | {date}
      </p>
      <Link to={post.fields.slug}>
        <h3 className="title post-header">
          {title}
        </h3>
      </Link>
      <PostContentWrapper>
        <p>{description}</p>
        <Link className="is-link is-bold" to={slug}>
          <strong>Read More...</strong>
        </Link>
      </PostContentWrapper>
      <TagList tags={tags} />
    </div>
  )
}

export default PostPreview
