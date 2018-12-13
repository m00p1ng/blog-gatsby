import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'
import React from 'react'

interface Props {
  tags: string[]
  size: string
}

const TagList = ({ tags, size }: Props) => {
  return (
    <div className="tags">
      {tags.map((tag: string) => (
        <Link
          key={tag}
          className={`tag is-link ${size}`}
          to={`/tags/${KebabCase(tag)}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
