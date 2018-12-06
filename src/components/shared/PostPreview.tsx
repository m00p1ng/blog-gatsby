// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'

import TagList from './TagList'

import Post from '../../models/Post'

interface Props {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  return (
    <div className="box">
      <Link to={post.fields.slug}>
        <h3 className="title">
          {post.frontmatter.title}
        </h3>
      </Link>
      <h6 className="subtitle">{post.frontmatter.date}</h6>
      <div className="content">
        <p>{post.frontmatter.description}</p>
        <Link className="is-link is-bold" to={post.fields.slug}><strong>Read More...</strong></Link>
      </div>
      <TagList tags={post.frontmatter.tags} />
    </div>
  )
}

export default PostPreview
