export const state = {
  mode: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'debug'
}

export function setMode (mode) {
  state.mode = mode
  localStorage.setItem('mode', mode)
}
