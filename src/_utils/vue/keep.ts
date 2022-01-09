export function keep<T, K, R> (
  object: T,
  keys: K[] = [],
  rest?: R
): Pick<T, K & keyof T> & R {
  const keepedObject: any = {}
  keys.forEach((key) => {
    keepedObject[key] = (object as any)[key]
  })
  return Object.assign(keepedObject, rest)
}
