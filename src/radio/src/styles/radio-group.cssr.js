import { cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --bezier
// --button-border-color
// --height
// --opacity-disabled
export default cB('radio-group', {
  display: 'inline-block'
}, [
  cE('splitor', `
    display: inline-block;
    vertical-align: bottom;
    width: 1px;
    transition:
      background-color .3s var(--bezier),
      opacity .3s var(--bezier);
    background: var(--button-border-color);
  `, [
    cM('checked', {
      backgroundColor: 'var(button-border-color-active)'
    }),
    cM('disabled', {
      opacity: 'var(--opacity-disabled)'
    })
  ]),
  cM('button-group', `
    white-space: nowrap;
    height: var(--height);
    line-height: var(--height);
  `, [
    cB('radio-button', {
      height: 'var(--height)',
      lineHeight: 'var(--height)'
    }),
    cE('splitor', {
      height: 'var(--height)'
    })
  ])
])
