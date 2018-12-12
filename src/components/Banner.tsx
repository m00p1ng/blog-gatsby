import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  subtitle: string
}

const BannerWrapper = styled.div`
  margin-bottom: 1rem;
`

const HeroContentWrapper = styled.div`
  margin-top: -1rem;
`

const Banner = ({ title, subtitle }: Props) => (
  <BannerWrapper>
    <section className="hero is-warning">
      <div className="hero-body hero-from-tablet">
        <div className="container">
          <HeroContentWrapper className="blog-container">
            <h1 className="title has-text-white is-size-3_5-mobile">
              {title}
            </h1>
            <h2 className="subtitle has-text-white">
              {subtitle}
            </h2>
          </HeroContentWrapper>
        </div>
      </div>
    </section>
  </BannerWrapper>
)

export default Banner
