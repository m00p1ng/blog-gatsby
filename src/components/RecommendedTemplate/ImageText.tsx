import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import Flip from 'react-reveal/Flip'
import styled from 'styled-components'

import Data from '../../models/Data'
import RecommendedPost from '../../models/RecommendedPost'

import '../../assets/scss/recommend-image.scss'

const RecommendWrapper = styled.div`
  margin-top: 1rem;
  &:first-child {
    margin-top: 3rem;
  }
`
const HeaderWrapper = styled.h1.attrs({
  className: 'title is-4'
})`
  margin-bottom: 1rem;
`

const TitleWrapper = styled.h1.attrs({
  className: 'title recommend-title'
})`
  margin: 1rem 0.2rem 0;
`

const StoryWrapper = styled.div`
  margin-bottom: 1rem;
`

interface Props {
  recommended: RecommendedPost
  title: string
}

const defaultImageQuery = graphql`
  query DefaultImageQuery {
    defaultImage: file(relativePath: { eq: "m00p1ng-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 768, maxHeight: 400, quality: 50, cropFocus: CENTER) {
          aspectRatio
          base64
          sizes
          src
          srcSet
          srcWebp
          srcSetWebp
        }
      }
    }
  }
`

const renderRecommendList = (recommended: RecommendedPost, data: Data) => (
  <>
    {recommended.posts.map(post => (
      <StoryWrapper className="column is-one-third" key={post.slug}>
        <Flip right>
          <Link to={post.slug}>
            <Img
              fluid={
                post.image ?
                  post.image.childImageSharp.fluid :
                  data.defaultImage!.childImageSharp.fluid
              }
            />
          </Link>
        </Flip>
        <TitleWrapper>
          <Link to={post.slug}>{post.title}</Link>
        </TitleWrapper>
      </StoryWrapper>
    ))}
  </>
)

const RecommendedTemplate = ({ recommended, title }: Props) => (
  <RecommendWrapper>
    <HeaderWrapper>{title}</HeaderWrapper>
    <div className="columns is-multiline recommend-breakpoint">
      <StaticQuery
        query={defaultImageQuery}
        render={data => renderRecommendList(recommended, data)}
      />
    </div>
  </RecommendWrapper>
)

export default RecommendedTemplate
