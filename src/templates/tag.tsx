import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'
import React from 'react'
import Helmet from 'react-helmet'

import Banner from '../components/Banner'
import BlogNavigation from '../components/BlogNavigation'
import Layout from '../components/Layout'
import PostPreview from '../components/PostPreview'

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
  } = pageContext!

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
      <Helmet title={`#${tag} ${pageTitleText(page!)} | ${siteTitle}`} />
      <Banner
        title={
          <>
            #
            <Link
              to={`/tags/${KebabCase(tag)}/list`}
              className="banner-link has-text-warning"
            >
              {tag}
            </Link>
          </>
        }
        subtitle={`${postText(total!)} ${pageText(page!, pages!)}`}
      />
      <div className="container">
        <div className="blog-container">
          <div className="postpreview__container">
            {nodes!.map(({ node }) => (
              <PostPreview key={node.id} post={node} />
            ))}
          </div>
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
    </Layout >
  )
}

export default Tags
