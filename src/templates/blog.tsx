// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'

import PageProps from '../models/PageProps'

const PostPreviewWrapper = styled.div`
 margin-top: 1rem;
`

const IndexPage = ({ pageContext }: PageProps) => {
  const { next, prev, nodes, page, pages } = pageContext

  return (
    <Layout>
      <div className="postpreview-padding">
        <PostPreviewWrapper>
          {
            nodes.map(({ node }) => {
              return <PostPreview key={node.id} post={node} />
            })
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
    </Layout>
  )
}

export default IndexPage
