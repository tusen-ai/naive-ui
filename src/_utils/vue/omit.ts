export function omit<T, K extends keyof T, R extends Record<string, any>> (
  object: T,
  keys: K[] = [],
  rest?: R
): Omit<T, K> & (R extends undefined ? Record<string, unknown> : R) {
  const omitedObject: any = {}
  const originalKeys = Object.getOwnPropertyNames(object)
  originalKeys.forEach((originalKey) => {
    if (!(keys as string[]).includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey as keyof T]
    }
  })
  return Object.assign(omitedObject, rest)
}
