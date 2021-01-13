export function omit <T, K extends keyof T, R> (
  object: T,
  keys: K[] = [],
  rest: R
): Pick<T, Exclude<keyof T, K>> & R {
  const omitedObject: any = {}
  const originalKeys = Object.getOwnPropertyNames(object)
  originalKeys.forEach((originalKey) => {
    if (!(keys as string[]).includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey as keyof T]
    }
  })
  return Object.assign(omitedObject, rest) as any
}
