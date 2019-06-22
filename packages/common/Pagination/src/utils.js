/**
 *
 * @param {number} currentPage
 * @param {number} pageCount
 */
function pagesToShow (currentPage, pageCount) {
  if (pageCount === 1) return [1]
  const firstPage = 1
  const lastPage = pageCount
  let middleStart = currentPage
  let middleEnd = currentPage
  if (firstPage === currentPage) {
    middleEnd += 4
  } else if (firstPage + 1 === currentPage) {
    middleEnd += 3
  } else {
    middleEnd += 2
  }
  if (lastPage === currentPage) {
    middleStart -= 4
  } else if (lastPage - 1 === currentPage) {
    middleStart -= 3
  } else {
    middleStart -= 2
  }
  let leftSplit = false
  let rightSplit = false
  if (middleStart > firstPage + 1) leftSplit = true
  if (middleEnd < lastPage - 1) rightSplit = true
  const items = []
  items.push(firstPage)
  if (leftSplit) {
    items.push(-2)
  }
  for (let i = Math.max(middleStart, firstPage + 1); i <= middleEnd && i < lastPage; ++i) {
    items.push(i)
  }
  if (rightSplit) {
    items.push(-1)
  }
  items.push(lastPage)
  return items
}

function pageItems (currentPage, pageCount) {
  const pages = pagesToShow(currentPage, pageCount)
  const items = pages.map(page => {
    switch (page) {
      case -2:
        return {
          type: 'fastBackward',
          label: 'fastBackward'
        }
      case -1:
        return {
          type: 'fastForward',
          label: 'fastForward'
        }
      default:
        if (page === currentPage) {
          return {
            type: 'page',
            label: page,
            active: true
          }
        } else {
          return {
            type: 'page',
            label: page,
            activa: false
          }
        }
    }
  })
  return items
}

export { pagesToShow, pageItems }
