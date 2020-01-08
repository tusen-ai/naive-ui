export function createClassObject (classString) {
  if (!classString) return {}
  if (typeof classString === 'string') {
    return classString.split(' ').filter(className => className).reduce((classObject, className) => {
      classObject[className] = true
      return classObject
    }, {})
  }
  return classString
}

export function createCustomWidthStyle (column, index, placement) {
  if (column.width) {
    const width = column.width
    return {
      width: width + 'px'
    }
  } else if (column.type === 'selection') {
    const width = 48
    return {
      width: width + 'px'
    }
  }
  return null
}

export function setCheckStatusOfRow (checkedRows, row, checked) {
  while (true) {
    const checkedRowIndex = checkedRows.findIndex(checkedRow => checkedRow === row)
    if (~checkedRowIndex) checkedRows.splice(checkedRowIndex, 1)
    else break
  }
  if (checked) checkedRows.push(row)
}
