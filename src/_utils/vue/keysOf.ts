export function keysOf<T> (obj: T): Array<keyof T> {
  return Object.keys(obj) as any
}
