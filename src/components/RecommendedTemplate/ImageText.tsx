import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import Data from '../../models/Data'
import RecommendedPost from '../../models/RecommendedPost'

const RecommendWrapper = styled.div`
  margin-top: 3rem;
`
const HeaderWrapper = styled.div`
  margin-bottom: 1rem;
`

const TitleWrapper = styled.div`
  margin-top: 1rem;
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
        <Link to={post.slug}>
          <Img
            fluid={
              post.image ?
                post.image.childImageSharp.fluid :
                data.defaultImage!.childImageSharp.fluid
            }
          />
        </Link>
        <TitleWrapper>
          <p className="title is-5 recommend-title">
            <Link to={post.slug}>
              {post.title}
            </Link>
          </p>
        </TitleWrapper>
      </StoryWrapper>
    ))}
  </>
)

const RecommendedTemplate = ({ recommended, title }: Props) => {
  return (
    <RecommendWrapper>
      <HeaderWrapper>
        <h1 className="title has-text-centered is-4">
          {title}
        </h1>
      </HeaderWrapper>
      <div className="columns recommend-breakpoint">
        <StaticQuery
          query={defaultImageQuery}
          render={data => renderRecommendList(recommended, data)}
        />
      </div>
    </RecommendWrapper>
  )
}

export default RecommendedTemplate
