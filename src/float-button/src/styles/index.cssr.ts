import { c, cB } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-box-shadow
// --n-box-shadow-hover
// --n-box-shadow-pressed
// --n-color
// --n-text-color

export default cB('float-button', `
  position: fixed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-color);
  transition:
    color .3s var(--n-bezier),
    box-shadow .3s var(--n-bezier),
    background-color .3s var(--n-bezier);
  box-shadow: var(--n-box-shadow);
  background-color: var(--n-color);
`, [
  c('&:hover', {
    boxShadow: 'var(--n-box-shadow-hover)'
  }),
  c('&:active', {
    boxShadow: 'var(--n-box-shadow-pressed)'
  })
])
