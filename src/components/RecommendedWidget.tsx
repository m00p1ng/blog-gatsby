import React from 'react'

import RecommendedTemplate from './RecommendedTemplate'

import RecommendedGroup from '../models/RecommendedGroup'

interface Props {
  recommendedGroup: RecommendedGroup
}

const RecommendedWidget = ({ recommendedGroup }: Props) => (
  <>
    {recommendedGroup!.series && (
      <RecommendedTemplate
        recommended={recommendedGroup!.series!}
        title="More Series"
      />
    )}
    {recommendedGroup!.tags && (
      <RecommendedTemplate
        recommended={recommendedGroup!.tags!}
        title="Related Story"
      />
    )}
    <RecommendedTemplate
      recommended={recommendedGroup!.latest}
      title="Latest Story"
    />
  </>
)

export default RecommendedWidget
