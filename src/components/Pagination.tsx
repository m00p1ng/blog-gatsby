// @ts-ignore
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import PageContext from '../models/PageContext'

interface Props {
  pageContext: PageContext
  pathPrefix: string
}

const PaginationWrapper = styled.div`
  margin-top: 2.5rem;
`

const PaginationTemplate = ({ pageContext, pathPrefix }: Props) => {
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

  return (
    <PaginationWrapper>
      <div className="columns is-mobile">
        <div className="column has-text-left">
          {previousPagePath && (
            <Link to={previousPagePath} rel="prev">
              <h1 className="title is-5 has-text-white">
                ← Newer
            </h1>
            </Link>
          )}
        </div>
        <div className="column has-text-centered has-text-white">
          <h1 className="subtitle is-5 has-text-white">
            Page {humanPageNumber} of {numberOfPages}
          </h1>
        </div>
        <div className="column has-text-right">
          {nextPagePath && (
            <Link to={nextPagePath} rel="next">
              <h1 className="title is-5 has-text-white">
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
