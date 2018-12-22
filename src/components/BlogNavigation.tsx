import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import '../assets/scss/blog-navigation.scss'

interface Props {
  next?: string
  prev?: string
  page: number
  pages: number
}

const NavigationWrapper = styled.div`
  margin: 1rem 0;
`

const BlogNavigation = ({ next, prev, page, pages }: Props) => (
  <NavigationWrapper id="blog-nav">
    <nav className="columns is-mobile">
      <div className="column has-text-left">
        {next && (
          <Link to={next} rel="next">
            <h1 className="title blog-nav-font pagination-link page-link__left">
              <span className="icon is-medium">
                <FontAwesomeIcon icon="angle-double-left" />
              </span>
              Older
            </h1>
          </Link>
        )}
      </div>
      <div className="column blog-nav-page">
        <h1 className="subtitle blog-nav-font">
          Page {page} of {pages}
        </h1>
      </div>
      <div className="column has-text-right">
        {prev && (
          <Link to={prev} rel="prev">
            <h1 className="title blog-nav-font pagination-link page-link__right">
              Newer
              <span className="icon is-medium">
                <FontAwesomeIcon icon="angle-double-right" />
              </span>
            </h1>
          </Link>
        )}
      </div>
    </nav>
  </NavigationWrapper>
)

export default BlogNavigation
