// string => string (expected, not implemented)
// string => number (legacy)
export function parse (value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '')
  ) { return null }
  return Number(value)
}

// string => boolean (expected, not implemented)
// number => boolean (legacy)
export function validator (value) {
  if (value === undefined || value === null) return true
  if (Number.isNaN(value)) return false
  return true
}

// string => string (expected, not implemented)
// string => number (legacy)
export function format (value) {
  if (value === undefined || value === null) return ''
  return String(value)
}
