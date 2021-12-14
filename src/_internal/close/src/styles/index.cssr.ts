import { cB, cM, c } from '../../../../_utils/cssr'

// Note: non-prefixed color should be removed after css vars prefix migration

// vars:
// --close-color
// --close-color-hover
// --close-color-pressed
// --close-color-disabled
export default cB('base-close', `
  cursor: pointer;
  color: var(--close-color, var(--n-close-color));
`, [
  c('&:hover', {
    color: 'var(--close-color-hover, var(--n-close-color))'
  }),
  c('&:active', {
    color: 'var(--close-color-pressed, var(--n-close-color-pressed))'
  }),
  cM('disabled', {
    cursor: 'not-allowed!important',
    color: 'var(--close-color-disabled, var(--n-close-color-disabled))'
  })
])
