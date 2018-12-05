import React from 'react'
import { Link } from 'gatsby'

import TagList from './TagList'

const PostPreview = ({ post, slug }) => {
  return (
    <div className="box">
      <div className="content">
        <Link to={slug}>
          <h2 className="title is-link">{post.frontmatter.title}</h2>
        </Link>
        <h4 className="subtitle">{post.frontmatter.date}</h4>
        <p>{post.frontmatter.description}</p>
        <TagList tags={post.frontmatter.tags} />
      </div>
    </div>
  )
}

export default PostPreview
