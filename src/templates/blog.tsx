import React from 'react'
import Helmet from 'react-helmet'

import BlogHeader from '../components/BlogHeader'
import BlogNavigation from '../components/BlogNavigation'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'

import PageProps from '../models/PageProps'

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
      {(page !== 1) && (
        <Helmet title={`Page ${page} | ${siteTitle}`} />
      )}
      <BlogHeader />
      <div className="container">
        <div className="blog-container">
          <div className="postpreview__container">
            {nodes!.map(({ node }) => (
              <PostPreview key={node.id} post={node} />
            ))}
          </div>
          {(next || prev) && (
            <BlogNavigation
              next={next}
              prev={prev}
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
