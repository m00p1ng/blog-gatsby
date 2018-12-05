import React from 'react'
import { Link } from 'gatsby'

const TagList = ({ tags }) => {
  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <Link className="tag is-info" to={`/tags/${tag}`} key={index}>
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
