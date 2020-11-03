export function omit (object, keys = [], rest = {}) {
  const omitedObject = {}
  const originalKeys = Object.getOwnPropertyNames(object)
  originalKeys.forEach(originalKey => {
    if (!keys.includes(originalKey)) omitedObject[originalKey] = object[originalKey]
  })
  return Object.assign(omitedObject, rest)
}
