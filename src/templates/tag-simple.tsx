import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Banner from '../components/Banner'
import PageContainer from '../components/PageContainer'
import Layout from '../layouts/Layout'

import PageProps from '../models/PageProps'

const LinkWrapper = styled.li`
  margin-bottom: 1.2rem;
`

const TagTemplate = ({ pageContext }: PageProps) => {
  const {
    siteTitle,
    tag,
    postByTags: posts,
    total
  } = pageContext!

  return (
    <Layout>
      <Helmet title={`#${tag} - All posts | ${siteTitle}`} />
      <Banner
        title={
          <>
            #
            <Link
              to={`/tags/${KebabCase(tag)}`}
              className="banner-link has-text-warning"
            >
              {tag}
            </Link>
          </>
        }
        subtitle={`${total} post${total !== 1 ? 's' : ''}`}
      />
      <PageContainer>
        <div className="card">
          <div className="content page-content page-fontsize">
            <ul>
              {posts!.map((post) => (
                <LinkWrapper key={post.id} >
                  <Link to={post.slug} className="rainbow">
                    {post.title}
                  </Link>
                  <small> - {post.date}</small>
                </LinkWrapper>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}

export default TagTemplate
