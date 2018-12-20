const _ = require('lodash')

const createSubDatePage = ({
  createPage,
  edges: posts,
  type,
  date,
  context,
  pathPrefix,
  template,
}) => {
  const prefix = pathPrefix || ''
  const dateTemplate = (typeof template !== 'string') ?
    template : ({
      dayTemplate: template,
      monthTemplate: template,
      yearTemplate: template,
    })

  createPage({
    path: `${prefix}/${date.replace(/-/g, '/')}`,
    component: dateTemplate[`${type}Template`],
    context: {
      ...context,
      dateType: type,
      date,
      total: posts[date].length,
      postByDate: posts[date],
    }
  })
}

const createRemarkDatePage = (config) => {
  const { edges: posts } = config
  const groupYear = _.groupBy(posts, (post) => (
    post.ISODate.slice(0, 4)
  ))

  Object.keys(groupYear).map((date) => {
    createSubDatePage({
      ...config,
      edges: groupYear,
      type: 'year',
      date,
    })

    // Generate Month Page
    const groupYearMonth = _.groupBy(groupYear[date], (post) => (
      post.ISODate.slice(0, 7)
    ))

    Object.keys(groupYearMonth).map((date) => {
      createSubDatePage({
        ...config,
        edges: groupYearMonth,
        type: 'month',
        date,
      })

      // Generate Day Page
      const groupYearMonthDay = _.groupBy(groupYearMonth[date], (post) => (
        post.ISODate.slice(0, 10)
      ))

      Object.keys(groupYearMonthDay).map((date) => {
        createSubDatePage({
          ...config,
          edges: groupYearMonthDay,
          type: 'day',
          date,
        })
      })
    })
  })
}

module.exports = createRemarkDatePage