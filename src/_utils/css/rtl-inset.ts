import { getPadding } from 'seemly'

export function rtlInset (inset: string): string {
  const { left, right, top, bottom } = getPadding(inset)
  return `${top} ${right} ${bottom} ${left}`
}
