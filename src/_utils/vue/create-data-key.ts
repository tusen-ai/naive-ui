export function createDataKey (key: string | number): string {
  return typeof key === 'string' ? `s-${key}` : `n-${key}`
}
