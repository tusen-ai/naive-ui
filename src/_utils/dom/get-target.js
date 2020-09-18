export default function getTarget (to) {
  return typeof to === 'string' ? document.querySelector(to) : to
}
