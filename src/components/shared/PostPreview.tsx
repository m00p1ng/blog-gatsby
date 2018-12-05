import React from 'react'
import { Link } from 'gatsby'

import TagList from './TagList'

const PostPreview = ({ post, slug }) => {
  return (
    <div className="box">
      <div className="content">
        <h2 className="title is-link">
          <Link to={slug}>{post.frontmatter.title}</Link>
        </h2>
        <h4 className="subtitle">{post.frontmatter.date}</h4>
        <p>{post.frontmatter.description}</p>
        <TagList tags={post.frontmatter.tags} />
      </div>
    </div>
  )
}

export default PostPreview
