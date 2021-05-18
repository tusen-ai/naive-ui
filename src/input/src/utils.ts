export function len (s: string): number {
  let count = 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of s) {
    count++
  }
  return count
}
