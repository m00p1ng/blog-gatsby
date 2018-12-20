import { DiscussionEmbed } from 'disqus-react'
import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

import Data from '../models/Data'

interface DisqusWidgetProps {
  config: {
    title: string
    id: string
  }
}

const DisqusWrapper = styled(DiscussionEmbed)`
  margin-top: 2rem;
`

const DisqusWidget = ({ config }: DisqusWidgetProps) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            disqusShortname
          }
        }
      }
    `}
    render={(data: Data) => {
      const { disqusShortname } = data.site!.siteMetadata

      return disqusShortname ? (
        <LazyLoad>
          <div className="post-comment">
            <DisqusWrapper
              shortname={disqusShortname}
              config={config}
            />
          </div>
        </LazyLoad>
      ) : null
    }}
  />
)

export default DisqusWidget
