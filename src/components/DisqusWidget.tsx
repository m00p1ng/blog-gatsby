import { DiscussionEmbed } from 'disqus-react'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

interface DisqusWidgetProps {
  shortname: string
  config: {
    title: string
    id: string
  }
}

const DisqusWrapper = styled(DiscussionEmbed)`
  margin-top: 2rem;
`

const DisqusWidget = ({ config, shortname }: DisqusWidgetProps) => (
  <LazyLoad>
    <div className="post-comment">
      <DisqusWrapper
        shortname={shortname}
        config={config}
      />
    </div>
  </LazyLoad>
)

export default DisqusWidget
