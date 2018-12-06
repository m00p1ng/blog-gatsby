// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'
import KebabCase from 'lodash/kebabCase'

import TagList from './TagList'

import Post from '../../models/Post'

interface Props {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  const { title, date, description, tags, category } = post.frontmatter
  const { slug } = post.fields

  return (
    <div className="box">
      <Link to={post.fields.slug}>
        <h3 className="title">
          {title}
        </h3>
      </Link>
      <h6 className="subtitle">
        <Link to={`/categories/${KebabCase(category)}`}>{category}</Link> | {date}
      </h6>
      <div className="content">
        <p>{description}</p>
        <Link className="is-link is-bold" to={slug}>
          <strong>Read More...</strong>
        </Link>
      </div>
      <TagList tags={tags} />
    </div>
  )
}

export default PostPreview
