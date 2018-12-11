// @ts-ignore
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'
import Pagination from '../components/Pagination'
import Banner from '../components/Banner'

import PageProps from '../models/PageProps'

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
        title={`#${tag}`}
        subtitle={
          `${(pages !== 1) ? `Page ${page} of ${pages} •` : ''} ${total} post${(total !== 1) ? 's' : ''}`
        }
      />
      <div className="container">
        <Helmet title={`#${tag} | ${siteTitle}`} />
        <div className="blog-padding">
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
