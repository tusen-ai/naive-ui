export const state = {
  mode: localStorage.getItem('mode')
}

export function setState (mode) {
  state.mode = mode
}
