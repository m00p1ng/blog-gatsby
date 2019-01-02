import React from 'react'

interface BlogContainerProps {
  children: React.ReactNode
}

const BlogContainer = ({ children }: BlogContainerProps) => (
  <div className="container">
    <div className="blog-container">
      {children}
    </div>
  </div>
)

export default BlogContainer
