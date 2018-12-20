import { DiscussionEmbed } from 'disqus-react'
import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import LazyLoad from 'react-lazyload'

import Data from '../models/Data'

interface DisqusWidgetProps {
  config: {
    title: string
    id: string
  }
}

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
            <DiscussionEmbed
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
