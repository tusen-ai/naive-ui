/**
 * Get CSS computed property of the given element
 * @method
 * @param {Eement} element
 * @param {String} property
 */
export default function getStyleComputedProperty (element, property) {
  if (element.nodeType !== 1) {
    return []
  }
  // NOTE: 1 DOM access here
  const css = getComputedStyle(element, null)
  return property ? css[property] : css
}
