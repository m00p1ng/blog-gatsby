// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'

import PageProps from '../models/PageProps'

const PostPreviewWrapper = styled.div`
 margin-top: 1rem;
`

const IndexPage = ({ pageContext }: PageProps) => {
  const { next, prev, nodes, page, pages, siteTitle } = pageContext

  return (
    <Layout>
      <div className="container">
        {(page !== 1) && (
          <Helmet title={`Page ${page} | ${siteTitle}`} />
        )}
        <div className="blog-padding">
          <PostPreviewWrapper>
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
          </PostPreviewWrapper>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
