/*
 * @Author: Volankey@gmail.com
 * @Company: Tusimple
 * @Date: 2019-10-24 18:07:27
 * @LastEditors: Jiwen.bai
 * @LastEditTime: 2019-10-24 18:07:27
 */
export const removeClass = (dom, className) => {
  dom.classList.remove(className)
}

export const addClass = (dom, className) => {
  dom.classList.add(className)
}

export const createCustomWidthStyle = function createCustomWidthStyle (column, index, placement) {
  if (column.width) {
    let width = column.width
    if (index === 0 && placement === 'right') width += 1
    return {
      width: width + 'px'
    }
  } else if (column.type === 'selection') {
    let width = 60
    if (index === 0 && placement === 'right') width += 1
    return {
      width: width + 'px'
    }
  }
  return null
}
