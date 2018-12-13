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

const PageOfWrapper = styled.div`
  display:inline-flex;
  align-items: center;
  justify-content: center;
`

const PaginationTemplate = ({ next, prev, page, pages }: Props) => {

  return (
    <PaginationWrapper>
      <nav className="columns is-mobile">
        <div className="column">
          {prev && (
            <Link to={prev} rel="prev">
              <h1 className="title pagination-font pagination-link pagination-link__left">
                ← Newer
              </h1>
            </Link>
          )}
        </div>
        <PageOfWrapper className="column pagination-page">
          <h1 className="subtitle pagination-font">
            Page {page} of {pages}
          </h1>
        </PageOfWrapper>
        <div className="column has-text-right">
          {next && (
            <Link to={next} rel="next">
              <h1 className="title pagination-font pagination-link pagination-link__right">
                Older →
              </h1>
            </Link>
          )}
        </div>
      </nav>
    </PaginationWrapper>
  )
}

export default PaginationTemplate
