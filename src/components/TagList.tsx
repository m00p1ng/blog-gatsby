import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'
import React, { Fragment } from 'react'

interface Props {
  tags: string[]
  size?: string
  color?: string
  disableLink?: boolean
}

const TagList = ({ tags, size = '', color = '', disableLink = false }: Props) => (
  <div className="tags">
    {tags.map((tag) => (
      <Fragment key={tag}>
        {disableLink !== false ? (
          <div className={`tag ${color} ${size} disable-hover`}>
            {tag}
          </div>
        ) : (
            <Link
              className={`tag ${color} ${size}`}
              to={`/tags/${KebabCase(tag)}`}
            >
              {tag}
            </Link>
          )}
      </Fragment>
    ))}
  </div>
)

export default TagList
