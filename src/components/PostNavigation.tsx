import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import React from 'react'

import Page from '../models/Page'

interface Props {
  nextPost: Page
  prevPost: Page
}

const PostNavigation = ({ nextPost, prevPost }: Props) => (
  <nav className="post-navigation" aria-label="pagination">
    {nextPost && nextPost != null ? (
      <Link
        to={nextPost.fields.slug}
        className="button is-outlined is-link is-rounded pagination-link__left"
      >
        <span className="icon is-medium">
          <FontAwesomeIcon icon="angle-double-left" />
        </span>
        <span>
          {nextPost.frontmatter.title}
        </span>
      </Link>
    ) : null}
    {prevPost && prevPost != null ? (
      <Link
        to={prevPost.fields.slug}
        className="button is-outlined is-link is-rounded pagination-link__right"
      >
        <span>
          {prevPost.frontmatter.title}
        </span>
        <span className="icon is-medium">
          <FontAwesomeIcon icon="angle-double-right" />
        </span>
      </Link>
    ) : null}
  </nav>
)

export default PostNavigation
