export function keep (object, keys) {
  const keepedObject = {}
  keys.forEach(key => {
    keepedObject[key] = object[key]
  })
  return keepedObject
}
