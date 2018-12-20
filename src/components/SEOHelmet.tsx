import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import Data from '../models/Data'
import Post from '../models/Post'

interface RenderProps {
  url: string
  post: Post
  siteTitle: string
  path: string
}

interface Props {
  post: Post
  siteTitle: string
  path: string
}

const renderSEOHelmet = ({ post, siteTitle, path, url }: RenderProps) => {
  const {
    description,
    ISODate,
    image,
  } = post.frontmatter!

  const iconImage = `${url}/favicon.png`
  const thumbnail = image ? `${url}${image.childImageSharp.fluid!.src}` : iconImage

  return (
    <Helmet>
      <meta name="description" content={description} />

      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:card" content={thumbnail} />
      <meta name="twitter:image:src" content={thumbnail} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${url}${path}`} />
      <meta property="og:type" content="article" />
      <meta property="og:updated_time" content={ISODate} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:secure_url" content={thumbnail} />
    </Helmet>
  )
}

const SEOHelmet = ({ post, siteTitle, path }: Props) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              url
            }
          }
        }
      `}
      render={(data: Data) => {
        const { url } = data.site!.siteMetadata

        return renderSEOHelmet({
          post,
          siteTitle,
          path,
          url: url!
        })
      }}
    />
  )
}

export default SEOHelmet
