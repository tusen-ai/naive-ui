/**
 * @param {VueComponentInstance} instance
 * @param {boolean} returnBoolean if set to true, it returns whether the instance
 * is inside a modal or a drawer
 */
export function getPortalTarget (instance, returnBoolean = false) {
  let cursor = instance.$parent
  while (cursor) {
    const componentName = cursor.$options.name
    if (
      componentName === 'NModalContent' ||
      componentName === 'NDrawerContent'
    ) {
      return returnBoolean ? true : cursor.getDetachTarget()
    }
    cursor = cursor.$parent
  }
  return returnBoolean ? false : document.body
}
