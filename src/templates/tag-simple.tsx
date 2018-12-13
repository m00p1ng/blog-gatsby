import { Link } from 'gatsby'
import KebabCase from 'lodash/kebabCase'
import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Banner from '../components/Banner'
import Layout from '../components/Layout'

import PageProps from '../models/PageProps'

const TagWrapper = styled.li`
  margin-bottom: 1.2rem;
`

interface TagPost {
  id: string
  slug: string
  title: string
  date: string
}

const TagTemplate = ({ pageContext }: PageProps) => {
  const { siteTitle, tag, posts, total } = pageContext

  return (
    <Layout>
      <Helmet title={`#${tag} - All posts | ${siteTitle}`} />
      <Banner
        title={
          <Link
            to={`/tags/${KebabCase(tag)}`}
            className="hero-tag-hover"
          >
            #{tag}
          </Link>
        }
        subtitle={`${total} post${total !== 1 ? 's' : ''}`}
      />
      <div className="container">
        <div className="post">
          <div className="box">
            <div className="content is-medium">
              <ul>
                {posts.map((post: TagPost) => (
                  <TagWrapper key={post.id} >
                    <Link to={post.slug}>
                      {post.title}
                    </Link>
                    <small> - {post.date}</small>
                  </TagWrapper>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TagTemplate
