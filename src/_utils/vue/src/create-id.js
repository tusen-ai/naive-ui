export function createId (length = 8) {
  return Math.random().toString(16).slice(2, 2 + length)
}
