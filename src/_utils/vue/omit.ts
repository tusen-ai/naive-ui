export function omit<T, K extends keyof T, R> (
  object: T,
  keys: K[] = [],
  rest?: R
  // eslint-disable-next-line @typescript-eslint/ban-types
): Pick<T, Exclude<keyof T, K>> & (R extends undefined ? {} : R) {
  const omitedObject: any = {}
  const originalKeys = Object.getOwnPropertyNames(object)
  originalKeys.forEach((originalKey) => {
    if (!(keys as string[]).includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey as keyof T]
    }
  })
  return Object.assign(omitedObject, rest) as any
}
