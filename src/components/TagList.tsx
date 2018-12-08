// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'
import KebabCase from 'lodash/kebabCase'

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
          className={`tag is-primary ${size}`}
          to={`/tags/${KebabCase(tag)}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
