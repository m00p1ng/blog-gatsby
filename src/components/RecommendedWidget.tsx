import React from 'react'

import RecommendedTemplate from './RecommendedTemplate/ImageText'

import RecommendedGroup from '../models/RecommendedGroup'

interface Props {
  recommendedGroup: RecommendedGroup
}

const RecommendedWidget = ({ recommendedGroup }: Props) => (
  <>
    {recommendedGroup!.series && (
      <RecommendedTemplate
        recommended={recommendedGroup.series!}
        title="This Series"
      />
    )}
    {recommendedGroup!.tags && (
      <RecommendedTemplate
        recommended={recommendedGroup.tags!}
        title="Related Story"
      />
    )}
    {recommendedGroup!.latest && (
      <RecommendedTemplate
        recommended={recommendedGroup.latest!}
        title="Latest Story"
      />
    )}
  </>
)

export default RecommendedWidget
