export default function getTarget (to) {
  if (typeof to === 'string') {
    return document.querySelector(to)
  } else if (typeof to === 'function') {
    return to()
  }
  return to
}
