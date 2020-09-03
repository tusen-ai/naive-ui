export const modeRef = {
  value: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'debug'
}
export function setMode (value) {
  modeRef.value = value
  localStorage.setItem('mode', value)
}
