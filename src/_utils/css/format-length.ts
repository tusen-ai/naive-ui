const pureNumberRegex = /^(\d|\.)+$/
const numberRegex = /(\d|\.)+/

interface FormatLengthOptions {
  c?: number
  offset?: number
  attachPx?: boolean
}

export function formatLength<
  T extends number | string | null | undefined | any
> (
  length: T,
  { c = 1, offset = 0, attachPx = true }: FormatLengthOptions = {}
): T extends null
    ? null
    : T extends undefined
      ? undefined
      : T extends string | number
        ? string
        : T {
  if (typeof length === 'number') {
    const result = (length + offset) * c
    if (result === 0) return '0' as any
    return `${result}px` as any
  } else if (typeof length === 'string') {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c
      if (attachPx) {
        if (result === 0) return '0' as any
        return `${result}px` as any
      } else {
        return `${result}` as any
      }
    } else {
      const result = numberRegex.exec(length)
      if (!result) return length as any
      return length.replace(
        numberRegex,
        String((Number(result[0]) + offset) * c)
      ) as any
    }
  }
  return length as any
}
