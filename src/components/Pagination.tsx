// @ts-ignore
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
  margin: 2.5rem 0;
`

const PageOfWrapper = styled.div`
  margin-top: 0.3rem;
`

const PaginationTemplate = ({ next, prev, page, pages }: Props) => {

  return (
    <PaginationWrapper>
      <div className="columns is-mobile">
        <div className="column has-text-left">
          {prev && (
            <Link to={prev} rel="prev">
              <h1 className="title pagination-font">
                ← Newer
              </h1>
            </Link>
          )}
        </div>
        <div className="column has-text-centered pagination-page">
          <PageOfWrapper>
            <h1 className="subtitle pagination-font is-size-6">
              Page {page} of {pages}
            </h1>
          </PageOfWrapper>
        </div>
        <div className="column has-text-right">
          {next && (
            <Link to={next} rel="next">
              <h1 className="title pagination-font">
                Older →
              </h1>
            </Link>
          )}
        </div>
      </div>
    </PaginationWrapper>
  )
}

export default PaginationTemplate
