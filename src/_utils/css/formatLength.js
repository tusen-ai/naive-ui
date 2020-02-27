export default function formatLength (length) {
  if (typeof length === 'number') return '' + (length && length + 'px')
  if (typeof length === 'string' && /^(\d|\.)+$/.test(length)) return length + 'px'
  return length
}
