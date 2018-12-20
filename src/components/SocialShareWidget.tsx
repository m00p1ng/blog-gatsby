import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'
import styled from 'styled-components'

import Data from '../models/Data'

import '../assets/scss/social.scss'

interface RenderProps {
  url: string
  slug: string
  title: string
  tags?: string[]
}

interface Props {
  slug: string
  title: string
  tags?: string[]
}

const SocialShareWrapper = styled.div`
  margin-top: 2rem;
`

const renderSocialShareWidget = ({ url, slug, title, tags }: RenderProps) => (
  <SocialShareWrapper>
    <p className="title is-6">Share:</p>
    <div className="post-social">
      <FacebookShareButton
        url={`${url}${slug}`}
        className="button facebook bounce"
      >
        <span className="icon">
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </span>
        <span>Facebook</span>
      </FacebookShareButton>
      <TwitterShareButton
        url={`${url}${slug}`}
        title={title}
        hashtags={tags ? tags.map(tag => tag.replace(' ', '')) : []}
        className="button twitter bounce"
      >
        <span className="icon">
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </span>
        <span>Twitter</span>
      </TwitterShareButton>
    </div>
  </SocialShareWrapper>
)
const SocialShareWidget = ({ slug, title, tags }: Props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteURL
          }
        }
      } 
    `}
    render={(data: Data) => {
      const { siteURL } = data.site!.siteMetadata

      return renderSocialShareWidget({
        url: siteURL!,
        slug,
        title,
        tags,
      })
    }}
  />
)

export default SocialShareWidget
