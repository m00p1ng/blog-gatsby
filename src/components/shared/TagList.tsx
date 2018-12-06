import React from 'react'
import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'

const TagList = ({ tags }) => {
  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <Link
          className="tag is-info"
          to={`/tags/${KebabCase(tag)}`}
          key={index} >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
