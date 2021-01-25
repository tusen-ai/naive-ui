// string => string (expected, not implemented)
// string => number (legacy)
export function parse (value: string): number | null {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '')
  ) {
    return null
  }
  return Number(value)
}

// string => boolean (expected, not implemented)
// number => boolean (legacy)
export function validator (value: number | undefined | null): boolean {
  if (value === undefined || value === null) return true
  if (Number.isNaN(value)) return false
  return true
}

// string => string (expected, not implemented)
// number => string (legacy)
export function format (value: number | undefined | null): string {
  if (value === undefined || value === null) return ''
  return String(value)
}

export function parseNumber (
  number: number | null | undefined | string
): number | null {
  if (number === null) return null
  if (typeof number === 'number') {
    return number
  } else {
    const parsedNumber = Number(number)
    if (Number.isNaN(parsedNumber)) return null
    else {
      return parsedNumber
    }
  }
}
