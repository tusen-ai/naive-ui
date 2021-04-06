import { c, cB } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

// vars:
// --bezier
// --menu-box-shadow
export default c([
  cB('auto-complete', `
    display: inline-flex;
    width: 100%;
  `),
  cB('auto-complete-menu', `
    margin: 4px 0;
    box-shadow: var(--menu-box-shadow);
  `, [
    fadeInScaleUpTransition({
      originalTransition: 'background-color .3s var(--bezier)'
    })
  ])
])
