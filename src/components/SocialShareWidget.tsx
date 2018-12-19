import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'
import styled from 'styled-components'

import '../assets/scss/social.scss'

interface Props {
  url: string
  title: string
  tags?: string[]
}

const SocialShareWrapper = styled.div`
  margin-top: 2rem;
`

const SocialShareWidget = ({ url, title, tags }: Props) => (
  <SocialShareWrapper>
    <p className="title is-6">Share:</p>
    <div className="post-social">
      <FacebookShareButton url={url} className="button facebook">
        <span className="icon">
          <FontAwesomeIcon icon={['fab', 'facebook-f']} />
        </span>
        <span>Facebook</span>
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        hashtags={tags ? tags.map(tag => tag.replace(' ', '')) : []}
        className="button twitter"
      >
        <span className="icon">
          <FontAwesomeIcon icon={['fab', 'twitter']} />
        </span>
        <span>Twitter</span>
      </TwitterShareButton>
    </div>
  </SocialShareWrapper>
)

export default SocialShareWidget
