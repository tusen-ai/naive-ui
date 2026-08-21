// string => string (expected, not implemented)
// string => number (legacy)
export function parse(value: string): number | null {
  if (
    value === undefined
    || value === null
    || (typeof value === 'string' && value.trim() === '')
  ) {
    return null
  }
  return Number(value)
}

// This function is created for `update-value-on-input` prop. When the prop is
// true, the input value will update the value and <input />'s value at the same
// time. So we need to make user's content won't be replaced by its parsed value
// in some certain cases. For example '0.' should be parsed and replaced by '0',
// '-0' should be parsed and replaced by '0', since user may input '-0.1' after.
export function isWipValue(value: string): boolean {
  return (
    (value.includes('.')
      && (/^(-)?\d+.*(\.|0)$/.test(value) || /^-?\d*$/.test(value)))
    || value === '-'
    || value === '-0'
  )
}

// string => boolean (expected, not implemented)
// number => boolean (legacy)
export function validator(value: number | null): boolean {
  if (value === undefined || value === null)
    return true
  if (Number.isNaN(value))
    return false
  return true
}

// string => string (expected, not implemented)
// number => string (legacy)
export function format(
  value: number | undefined | null,
  precision: number | undefined
): string {
  if (typeof value !== 'number')
    return ''
  if (precision === undefined) {
    const valueStr = String(value)
    if (isExponentialNotation(valueStr)) {
      const exponent = valueStr.toLowerCase().split('e')[1]
      return value.toFixed(Math.abs(Number(exponent)))
    }
    return valueStr
  }
  return value.toFixed(precision)
}

export function isExponentialNotation(value: string): boolean {
  return value.toLowerCase().includes('e')
}

export function parseNumber(
  number: number | null | undefined | string
): number | null {
  if (number === null)
    return null
  if (typeof number === 'number') {
    return number
  }
  else {
    const parsedNumber = Number(number)
    if (Number.isNaN(parsedNumber)) {
      return null
    }
    else {
      return parsedNumber
    }
  }
}
