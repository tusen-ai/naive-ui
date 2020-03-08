const pureNumberRegex = /^(\d|\.)+$/
const numberRegex = /(\d|\.)+/

export default function formatLength (length, weight = 1) {
  if (typeof length === 'number') return '' + (length && (length * weight) + 'px')
  if (typeof length === 'string') {
    if (pureNumberRegex.test(length)) {
      return (length * weight) + 'px'
    } else {
      const result = numberRegex.exec(length)
      if (!result) return length
      return length.replace(numberRegex, '' + Number(result[0]) * weight)
    }
  }
  return length
}
