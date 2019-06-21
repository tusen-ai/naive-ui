function pagesToShow (page, totalPage) {
  if (totalPage === 1) return [1]
  const firstPage = 1
  const lastPage = totalPage
  let middleStart = page
  let middleEnd = page
  if (firstPage === page) {
    middleEnd += 4
  } else if (firstPage + 1 === page) {
    middleEnd += 3
  } else {
    middleEnd += 2
  }
  if (lastPage === page) {
    middleStart -= 4
  } else if (lastPage - 1 === page) {
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
    items.push(-1)
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

export { pagesToShow }
