export const createClassObject = function createClassObject (classString) {
  if (!classString) return {}
  if (typeof classString === 'string') {
    return classString.split(' ').filter(className => className).reduce((classObject, className) => {
      classObject[className] = true
      return classObject
    }, {})
  }
  return classString
}

export const createCustomWidthStyle = function createCustomWidthStyle (column, index, placement) {
  if (column.width) {
    let width = column.width
    if (index === 0 && placement === 'right') width += 0
    return {
      width: width + 'px'
    }
  } else if (column.type === 'selection') {
    let width = 60
    if (index === 0 && placement === 'right') width += 0
    return {
      width: width + 'px'
    }
  }
  return null
}

export const setCheckStatusOfRow = function setCheckStatusOfRow (checkedRows, row, checked) {
  while (true) {
    const checkedRowIndex = checkedRows.findIndex(checkedRow => checkedRow === row)
    if (~checkedRowIndex) checkedRows.splice(checkedRowIndex, 1)
    else break
  }
  if (checked) checkedRows.push(row)
}
