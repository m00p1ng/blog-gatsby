interface PageContext {
  tag?: string
  category?: string

  previousPagePath?: string
  nextPagePath?: string
  humanPageNumber?: number
  numberOfPages?: number
}

export default PageContext
