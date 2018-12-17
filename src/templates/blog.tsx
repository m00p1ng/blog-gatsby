import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import BlogNavigation from '../components/BlogNavigation'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview/ImageRight'

import PageProps from '../models/PageProps'

const PostPreviewWrapper = styled.div`
  margin-top: 1rem;
`

const IndexPage = ({ pageContext }: PageProps) => {
  const {
    next,
    prev,
    nodes,
    page,
    pages,
    siteTitle
  } = pageContext!

  return (
    <Layout>
      <div className="container">
        {(page !== 1) && (
          <Helmet title={`Page ${page} | ${siteTitle}`} />
        )}
        <div className="blog-container">
          <PostPreviewWrapper>
            {nodes!.map(({ node }) => (
              <PostPreview key={node.id} post={node} />
            ))}
          </PostPreviewWrapper>
          {(next || prev) && (
            <BlogNavigation
              next={next!}
              prev={prev!}
              page={page!}
              pages={pages!}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
