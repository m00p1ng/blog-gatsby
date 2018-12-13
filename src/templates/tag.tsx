import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Banner from '../components/Banner'
import Layout from '../components/Layout'
import Pagination from '../components/Pagination'
import PostPreview from '../components/PostPreview'

import PageProps from '../models/PageProps'

const ResultWrapper = styled.div`
  margin-top: -1.5rem;
`

const Tags = ({ pageContext }: PageProps) => {
  const {
    next,
    prev,
    nodes,
    page,
    pages,
    total,
    siteTitle,
    tag
  } = pageContext

  return (
    <Layout>
      <Banner
        title={
          <Link to={`/tags/${KebabCase(tag)}/all`} className="hero-tag-hover">
            #{tag}
          </Link>
        }
        subtitle={
          `${total} post${(total !== 1) ? 's' : ''} ${(pages !== 1) ? `• Page ${page} of ${pages} ` : ''}`
        }
      />
      <ResultWrapper className="container">
        <Helmet title={`#${tag}${page !== 1 ? ` • Page ${page}` : ''} | ${siteTitle}`} /> :

        <div className="blog-container">
          {
            nodes.map(({ node }) => (
              <PostPreview key={node.id} post={node} />
            ))
          }
          {(next || prev) && (
            <Pagination
              next={next}
              prev={prev}
              page={page}
              pages={pages}
            />
          )}
        </div>
      </ResultWrapper>
    </Layout >
  )
}

export default Tags
