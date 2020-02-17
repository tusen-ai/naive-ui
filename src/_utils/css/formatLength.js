export default function formatLength (length) {
  if (typeof length === 'number') return '' + (length && length + 'px')
  return length
}
