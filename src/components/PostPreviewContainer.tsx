import React from 'react'

interface BlogContainerProps {
  children: React.ReactNode
}

const PostPreviewContainer = ({ children }: BlogContainerProps) => (
  <div className="container">
    <div className="postpreview-container">
      {children}
    </div>
  </div>
)

export default PostPreviewContainer
