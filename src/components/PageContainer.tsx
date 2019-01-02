import React from 'react'

interface PageContainerProps {
  children: React.ReactNode
}

const PageContainer = ({ children }: PageContainerProps) => (
  <div className="container">
    <div className="page-container">
      {children}
    </div>
  </div>
)

export default PageContainer
