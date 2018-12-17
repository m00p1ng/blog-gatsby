import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string | JSX.Element
  subtitle?: string
}

const BannerWrapper = styled.div`
  margin: 1rem 0;
`

const Banner = ({ title, subtitle }: Props) => (
  <BannerWrapper>
    <div className="banner">
      <div className="container">
        <div className="blog-container">
          <h1 className="title has-text-warning is-size-3_5-mobile">
            {title}
          </h1>
          {subtitle && (
            <h2 className="subtitle has-text-white">
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </div>
  </BannerWrapper>
)

export default Banner
