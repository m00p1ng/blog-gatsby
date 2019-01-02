import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  text-align: center;
  margin: 2rem 0;

  @media screen  and (max-width: 320px){
    font-size: 14px;
  }
`

const Header = styled.h1`
  font-size: 3rem;
  font-family: 'Roboto Mono';
  color: orange;
`

const LinkWrapper = styled(Link)`
  color: white;
  font-family: 'Roboto Mono';
  margin: 0 1rem;

  &:hover {
    color: orange;
    text-decoration: underline;
  }

  .touch &:focus:not(:active) {
    color: white;
    text-decoration: none;
  }
`

const Subtitle = styled.p`
  color: white;
`

const BlogHeader = () => (
  <HeaderWrapper>
    <Header>:m00p1ng:</Header>
    <Subtitle>
      <LinkWrapper to="/">Home</LinkWrapper>|
      <LinkWrapper to="/archives">Archives</LinkWrapper>|
      <LinkWrapper to="/tags">Tags</LinkWrapper>|
      <LinkWrapper to="/about">About</LinkWrapper>
    </Subtitle>
  </HeaderWrapper>
)

export default BlogHeader
