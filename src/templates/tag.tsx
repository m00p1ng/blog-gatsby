// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'

import PageProps from '../models/PageProps'

const Tags = ({ pageContext }: PageProps) => {
  const {
    next,
    prev,
    nodes,
    page,
    pages,
    siteTitle,
    tag
  } = pageContext

  return (
    <Layout>
      <div className="container">
        <Helmet title={`#${tag} | ${siteTitle}`} />
        <div className="blog-padding">
          <h1 className="title has-text-white">#{tag}</h1>
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
      </div>
    </Layout>
  )
}

export default Tags
