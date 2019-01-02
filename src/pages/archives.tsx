import { graphql, Link } from 'gatsby'
import groupBy from 'lodash/groupBy'
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Banner from '../components/Banner'
import PageContainer from '../components/PageContainer'
import Layout from '../layouts/Layout'

import Node from '../models/Node'
import PageProps from '../models/PageProps'

const LinkWrapper = styled.li`
  margin-bottom: 1.2rem;
`

const HeaderLinkWrapper = styled(Link).attrs({
  className: 'rainbow'
})`
  color: #363636;
`

interface GroupPostByDate {
  [key: string]: Node[]
}

const renderByDatePost = (groupYear: GroupPostByDate) => {
  return Object.keys(groupYear).reverse().map(year => (
    <Fragment key={year}>
      <h3>
        <HeaderLinkWrapper to={`/${year}`}>
          {year}
        </HeaderLinkWrapper>
      </h3>
      <ul>
        {groupYear[year].map(({ node }) => (
          <LinkWrapper key={node.id} >
            <div className="archive-content">
              <span className="archive-date">
                {node.frontmatter!.shortDate}
              </span>
              <Link
                to={node.fields!.slug}
                className="rainbow"
              >
                {node.frontmatter!.title}
              </Link>
            </div>
          </LinkWrapper>
        ))}
      </ul>
    </Fragment>
  ))
}

const Archive = ({ data }: PageProps) => {
  const { title: siteTitle } = data!.site!.siteMetadata
  const { totalCount: total, edges: posts } = data!.allMarkdownRemark!

  const groupYear = groupBy(posts, ({ node }) => (
    node.frontmatter!.date!.slice(0, 4)
  ))

  return (
    <Layout>
      <Helmet title={`Archives | ${siteTitle}`} />
      <Banner
        title={'Archives'}
        subtitle={`${total} post${total !== 1 ? 's' : ''}`}
      />
      <PageContainer>
        <div className="card">
          <div className="content page-content page-fontsize">
            {renderByDatePost(groupYear)}
          </div>
        </div>
      </PageContainer>
    </Layout>
  )
}

export default Archive

export const query = graphql`
  query ArchiveQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
      filter:{frontmatter: {published: {eq: true}}}
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            shortDate: date(formatString: "MMM DD, YY")
          }
        }
      }
    }
  }
`
