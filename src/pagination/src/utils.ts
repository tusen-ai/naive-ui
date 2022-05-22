function pagesToShow (
  currentPage: number,
  pageCount: number,
  pageSlot: number = 9
): number[] {
  if (pageCount <= 0) return [0]
  if (pageCount === 1) return [1]
  if (pageCount === 2) return [1, 2]
  const firstPage = 1
  const lastPage = pageCount
  let middleStart = currentPage
  let middleEnd = currentPage
  const middleDelta = (pageSlot - 5) / 2
  middleEnd += Math.ceil(middleDelta)
  middleEnd = Math.min(
    Math.max(middleEnd, firstPage + pageSlot - 3),
    lastPage - 2
  )
  middleStart -= Math.floor(middleDelta)
  middleStart = Math.max(
    Math.min(middleStart, lastPage - pageSlot + 3),
    firstPage + 2
  )
  let leftSplit = false
  let rightSplit = false
  if (middleStart > firstPage + 2) leftSplit = true
  if (middleEnd < lastPage - 2) rightSplit = true
  const items: number[] = []
  items.push(firstPage)
  if (leftSplit) {
    items.push(-2)
  } else if (lastPage >= firstPage + 1) {
    items.push(firstPage + 1)
  }
  for (let i = middleStart; i <= middleEnd; ++i) {
    items.push(i)
  }
  if (rightSplit) {
    items.push(-1)
  } else if (
    middleEnd === lastPage - 2 &&
    items[items.length - 1] !== lastPage - 1
  ) {
    items.push(lastPage - 1)
  }
  if (items[items.length - 1] !== lastPage) items.push(lastPage)
  return items
}

export type PageItem =
  | {
    type: 'fast-backward' | 'fast-forward'
    label?: undefined
    active: false
  }
  | {
    type: 'page'
    label: number
    active: boolean
  }

function mapPagesToPageItems (pages: number[], currentPage: number): PageItem[] {
  return pages.map((page) => {
    switch (page) {
      case -2:
        return {
          type: 'fast-backward',
          active: false
        }
      case -1:
        return {
          type: 'fast-forward',
          active: false
        }
      default:
        if (page !== 0 && page === currentPage) {
          return {
            type: 'page',
            label: page,
            active: true
          }
        } else {
          return {
            type: 'page',
            label: page,
            active: false
          }
        }
    }
  })
}

function pageItems (
  currentPage: number,
  pageCount: number,
  pageSlot?: number
): PageItem[] {
  const pages = pagesToShow(currentPage, pageCount, pageSlot)
  return mapPagesToPageItems(pages, currentPage)
}

export { pagesToShow, mapPagesToPageItems, pageItems }
