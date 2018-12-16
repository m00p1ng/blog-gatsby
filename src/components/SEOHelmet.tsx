import React from 'react'
import Helmet from 'react-helmet'

import Post from '../models/Post'
import Site from '../models/Site'

interface Props {
  post: Post
  site: Site
  siteTitle: string
  slug: string
}

const SEOHelmet = ({ post, site, siteTitle, slug }: Props) => {
  const {
    siteMetadata: { url }
  } = site

  const {
    frontmatter: { description, ISODate, image }
  } = post

  const iconImage = `${url}/favicon.png`
  const thumbnail = (image !== null) ? `${url}${image.childImageSharp.fluid!.src}` : iconImage

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
      <meta property="og:url" content={`${url}${slug}`} />
      <meta property="og:type" content="article" />
      <meta property="og:updated_time" content={ISODate} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:secure_url" content={thumbnail} />

    </Helmet>
  )
}

export default SEOHelmet
