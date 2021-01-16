import { cB, cM, c } from '../../../../_utils/cssr'

// vars:
// --close-color
// --close-color-hover
// --close-color-pressed
// --close-color-disabled
export default cB(
  'base-close',
  `
  cursor: pointer;
  color: var(--close-color);
`,
  [
    c('&:hover', {
      color: 'var(--close-color-hover)'
    }),
    c('&:active', {
      color: 'var(--close-color-pressed)'
    }),
    cM('disabled', {
      cursor: 'not-allowed!important',
      color: 'var(--close-color-disabled)'
    })
  ]
)
