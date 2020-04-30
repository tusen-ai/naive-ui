const pureNumberRegex = /^(\d|\.)+$/
const numberRegex = /(\d|\.)+/

export default function formatLength (length, weight = 1, offset = 0) {
  if (typeof length === 'number') return '' + ((length + offset) && ((length + offset) * weight) + 'px')
  if (typeof length === 'string') {
    if (pureNumberRegex.test(length)) {
      return ((Number(length) + offset) * weight) + 'px'
    } else {
      const result = numberRegex.exec(length)
      if (!result) return length
      return length.replace(numberRegex, '' + (Number(result[0]) + offset) * weight)
    }
  }
  return length
}
