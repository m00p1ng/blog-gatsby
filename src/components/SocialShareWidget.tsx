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
      <div className="button facebook">
        <FacebookShareButton url={url}>
          <span className="icon">
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          </span>
          <span className="text">Facebook</span>
        </FacebookShareButton>
      </div>
      <div className="button twitter">
        <TwitterShareButton
          url={url}
          title={title}
          hashtags={tags ? tags.map(tag => tag.replace(' ', '')) : []}
        >
          <span className="icon">
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </span>
          <span className="text">Twitter</span>
        </TwitterShareButton>
      </div>
    </div>
  </SocialShareWrapper>
)

export default SocialShareWidget
