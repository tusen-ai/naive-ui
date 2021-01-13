export function keep<T, K extends keyof T, R> (object: T, keys: K[] = [], rest: R): Pick<T, K> & R {
  const keepedObject: any = {}
  keys.forEach((key) => {
    keepedObject[key] = object[key]
  })
  return Object.assign(keepedObject, rest)
}
