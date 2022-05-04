import { cB, cM, c } from '../../../../_utils/cssr'

// vars:
// --n-close-color
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-color-disabled
export default cB('base-close', `
  cursor: pointer;
  color: var(--n-close-color);
`, [
  c('&:hover', {
    color: 'var(--n-close-color-hover)'
  }),
  c('&:active', {
    color: 'var(--n-close-color-pressed)'
  }),
  cM('disabled', {
    cursor: 'not-allowed!important',
    color: 'var(--n-close-color-disabled)'
  })
])
