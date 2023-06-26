export function keysOf<T extends Record<string, unknown>> (
  obj: T
): Array<keyof T> {
  return Object.keys(obj) as any
}
