import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import RecommendedPost from '../../models/RecommendedPost'

const RecommendWrapper = styled.div`
  margin-top: 3rem;
`
const HeaderWrapper = styled.h1.attrs({
  className: 'title is-5'
})`
  margin-bottom: -0.5rem;
`

interface Props {
  recommended: RecommendedPost
  title: string
}

const RecommendedTemplate = ({ recommended, title }: Props) => (
  <RecommendWrapper>
    <HeaderWrapper>
      {title}
    </HeaderWrapper>
    <div className="content markdown">
      <ul>
        {recommended.posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug} className="rainbow">{post.title}</Link>
            <small> - {post.date}</small>
          </li>
        ))}
      </ul>
    </div>
  </RecommendWrapper>
)

export default RecommendedTemplate
