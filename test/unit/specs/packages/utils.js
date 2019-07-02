/**
 * Return whether a searchPattern exists in a DOM Element's class list or its decendants' class list
 * @param {DOMElement} el
 * @param {string} searchPattern
 * @param {boolean} alsoSearchDescendant
 */
function existsInClassList (el, searchPattern, alsoSearchDescendant = false) {
  if (alsoSearchDescendant) {
    const children = Array.from(el.children)
    return existsInClassList(el, searchPattern) || children.some(el =>
      existsInClassList(el, searchPattern, true)
    )
  }
  return Array.from(el.classList).some(className => 1 + className.search(searchPattern))
}

async function sleep (ms = 0) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

export { existsInClassList, sleep }
