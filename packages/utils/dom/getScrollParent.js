import getStyleComputedProperty from './getStyleComputedProperty'
import getParentNode from './getParentNode'

/**
 * Returns the scrolling parent of the given element
 * @method
 * @param {Element} element
 * @returns {Element|null} scroll parent
 */
export default function getScrollParent (element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return null
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return document
    case '#document':
      return null
  }

  // Firefox want us to check `-x` and `-y` variations as well
  const { overflow, overflowX, overflowY } = getStyleComputedProperty(element)
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element
  }

  return getScrollParent(getParentNode(element))
}
