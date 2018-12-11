// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        className="post-navigation__previous button is-outlined is-link is-rounded"
      >
        <span className="icon is-medium">
          <FontAwesomeIcon icon="angle-double-left" />
        </span>
        <span className="post-navigation__label">
          {nextPost.frontmatter.title}
        </span>
      </Link>
    ) : null}
    {prevPost && prevPost != null ? (
      <Link
        to={prevPost.fields.slug}
        className="post-navigation__next button is-outlined is-link is-rounded"
      >
        <span className="post-navigation__label">
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
