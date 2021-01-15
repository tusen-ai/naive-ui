export function keysOf<T> (obj: T): (keyof T)[] {
  return Object.keys(obj) as any
}
