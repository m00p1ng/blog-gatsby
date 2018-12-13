import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import RecommendedPost from '../models/RecommendedPost'

const RecommendWrapper = styled.div`
  margin-bottom: 3rem;
`
const HeaderWrapper = styled.div`
  margin-bottom: -0.5rem;
`

const recommendHeader = (type: string) => (
  type === 'recommend' ? 'Related' : 'Latest'
)

interface Props {
  recommended: RecommendedPost
}

const RecommendedWidget = ({ recommended }: Props) => (
  <RecommendWrapper>
    <HeaderWrapper>
      <h1 className="title is-5">
        {recommendHeader(recommended.type)} Post
      </h1>
    </HeaderWrapper>
    <div className="content markdown">
      <ul>
        {recommended.posts.map(post => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
            <small> - {post.date}</small>
          </li>
        ))}
      </ul>
    </div>
  </RecommendWrapper>
)

export default RecommendedWidget
