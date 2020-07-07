export default function depx (value) {
  if (typeof value === 'string') {
    if (value.endsWith('px')) {
      return Number(value.slice(0, value.length - 2))
    }
    return Number(value)
  }
  return value
}
