import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface Props {
  next: string
  prev: string
  page: number
  pages: number
}

const PaginationWrapper = styled.div`
  margin: 1rem 0;
`

interface NavLinkProps {
  link: string
  rel: string
  className: string
  content: JSX.Element
}

const NavLink = ({ link, rel, className, content }: NavLinkProps) => (
  <Link to={link} rel={rel}>
    <h1 className={
      `title pagination-font pagination-link ${className}`
    }>
      {content}
    </h1>
  </Link>
)

const PaginationTemplate = ({ next, prev, page, pages }: Props) => (
  <PaginationWrapper id="pagination-blog">
    <nav className="columns is-mobile">
      <div className="column">
        {prev && (
          <NavLink
            link={prev}
            rel={'prev'}
            className="pagination-link__left"
            content={
              <>
                <span className="icon is-medium">
                  <FontAwesomeIcon icon="angle-double-left" />
                </span>
                Newer
              </>
            }
          />
        )}
      </div>
      <div className="column pagination-page">
        <h1 className="subtitle pagination-font">
          Page {page} of {pages}
        </h1>
      </div>
      <div className="column has-text-right">
        {next && (
          <NavLink
            link={next}
            rel={'next'}
            className="pagination-link__right"
            content={
              <>
                Older
                <span className="icon is-medium">
                  <FontAwesomeIcon icon="angle-double-right" />
                </span>
              </>
            }
          />
        )}
      </div>
    </nav>
  </PaginationWrapper>
)

export default PaginationTemplate
