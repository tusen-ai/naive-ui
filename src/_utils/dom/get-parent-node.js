/**
 * Returns the parentNode or the host of the element until document
 * @method
 * @param {Element} element
 * @returns {Element} parent
 */
export default function getParentNode (element) {
  if (element.nodeName === '#document') {
    return null
  }
  return element.parentNode
}
