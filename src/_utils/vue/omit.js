export default function omit (object, keys = [], rest = {}) {
  const omitedObject = { ...object }
  for (const key of keys) {
    delete omitedObject[key]
  }
  return { ...omitedObject, ...rest }
}
