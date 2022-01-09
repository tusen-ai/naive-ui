type PropertyName = string | number | symbol

export function keep<
  T extends object,
  K extends PropertyName,
  U extends Exclude<K, keyof T>
> (object: T, keys: K[]): Pick<T, keyof T & K> & Record<U, undefined>

export function keep<
  T extends object,
  K extends PropertyName,
  R,
  U extends Exclude<K, keyof T | keyof R>
> (
  object: T,
  keys: K[],
  rest: R
): Pick<T, Exclude<keyof T & K, keyof R>> & R & Record<U, undefined>

export function keep<
  T extends object,
  K extends PropertyName,
  R,
  U extends Exclude<K, keyof T | keyof R>
> (
  object: T,
  keys: K[] = [],
  rest?: R
): Pick<T, Exclude<keyof T & K, keyof R>> &
  (R extends null | undefined ? {} : R) &
  Record<U, undefined> {
  const keepedObject: any = {}
  keys.forEach((key) => {
    keepedObject[key] = (object as any)[key]
  })
  return Object.assign(keepedObject, rest)
}
