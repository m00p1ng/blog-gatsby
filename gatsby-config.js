const path = require('path')
let envPath = process.env.GATSBY_ENV === 'production' ?
  path.resolve('./.env.production') :
  path.resolve('./.env.development')

require('dotenv').config({ path: envPath })

module.exports = {
  siteMetadata: {
    title: 'm00p1ng',
    subtitle: 'All about me',
    siteURL: process.env.SITE_URL,
    description: 'Personal Blog of m00p1ng',
    author: 'Mongkonchai Priyachiwa',
    disqusShortname: process.env.DISQUS_SHORTNAME,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKER_ID,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-katex',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              maxWidth: 960,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'm00p1ng b10g',
        short_name: 'm00p1ng',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/images/m00p1ng-icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-offline',
    'gatsby-plugin-lodash',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-catch-links',
  ],
}
