// TODO: remove this after https://github.com/07akioni/seemly/pull/88 merged
export function clampValue(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
