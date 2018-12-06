// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'
import KebabCase from 'lodash/kebabCase'

interface Props {
  tags: string[]
}

const TagList = ({ tags }: Props) => {
  return (
    <div className="tags">
      {tags.map((tag: string) => (
        <Link
          key={tag}
          className="tag is-medium"
          to={`/tags/${KebabCase(tag)}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

export default TagList
