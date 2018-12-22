import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import React from 'react'

import PostPage from '../models/PostPage'

interface Props {
  nextPost?: PostPage
  prevPost?: PostPage
}

const PostNavigation = ({ nextPost, prevPost }: Props) => (
  <nav className="post-navigation" aria-label="pagination">
    {nextPost && (
      <Link
        to={nextPost.fields.slug}
        className="button is-outlined is-link is-rounded page-link__left"
      >
        <span className="icon is-medium">
          <FontAwesomeIcon icon="angle-double-left" />
        </span>
        <span>
          {nextPost.frontmatter.title}
        </span>
      </Link>
    )}
    {prevPost && (
      <Link
        to={prevPost.fields.slug}
        className="button is-outlined is-link is-rounded page-link__right"
      >
        <span>
          {prevPost.frontmatter.title}
        </span>
        <span className="icon is-medium">
          <FontAwesomeIcon icon="angle-double-right" />
        </span>
      </Link>
    )}
  </nav>
)

export default PostNavigation
