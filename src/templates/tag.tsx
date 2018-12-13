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

  const postText = (total: number) => {
    const post = `post${(total !== 1) ? 's' : ''}`

    return `${total} ${post}`
  }

  const pageText = (page: number, pages: number) => (
    pages !== 1 ? `• Page ${page} of ${pages}` : ''
  )

  const pageTitleText = (page: number) => (
    page !== 1 ? `• Page ${page}` : ''
  )

  return (
    <Layout>
      <Banner
        title={
          <Link
            to={`/tags/${KebabCase(tag)}/all`}
            className="hero-tag-hover"
          >
            #{tag}
          </Link>
        }
        subtitle={`${postText(total)} ${pageText(page, pages)}`}
      />
      <ResultWrapper className="container">
        <Helmet title={`#${tag} ${pageTitleText(page)} | ${siteTitle}`} />
        <div className="blog-container">
          {nodes.map(({ node }) => (
            <PostPreview key={node.id} post={node} />
          ))}
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
