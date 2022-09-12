export function keysOf<T extends {}> (obj: T): Array<keyof T> {
  return Object.keys(obj) as any
}
