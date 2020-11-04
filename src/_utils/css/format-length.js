const pureNumberRegex = /^(\d|\.)+$/
const numberRegex = /(\d|\.)+/

export default function formatLength (length, options = {}) {
  const {
    c = 1,
    offset = 0,
    attachPx = true
  } = options
  const type = typeof length
  if (type === 'number') {
    const result = (length + offset) * c
    if (result === 0) return '0'
    return `${result}px`
  } else if (type === 'string') {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c
      if (attachPx) {
        if (result === 0) return '0'
        return `${result}px`
      } else {
        return result
      }
    } else {
      const result = numberRegex.exec(length)
      if (!result) return length
      return length.replace(numberRegex, '' + (Number(result[0]) + offset) * c)
    }
  }
}
