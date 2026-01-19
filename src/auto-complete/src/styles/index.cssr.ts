import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { c, cB } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-duration
// --n-menu-box-shadow
export default c([
  cB('auto-complete', `
    z-index: auto;
    position: relative;
    display: inline-flex;
    width: 100%;
  `),
  cB('auto-complete-menu', `
    margin: 4px 0;
    box-shadow: var(--n-menu-box-shadow);
  `, [
    fadeInScaleUpTransition({
      originalTransition: 'background-color var(--n-duration) var(--n-bezier), box-shadow var(--n-duration) var(--n-bezier)'
    })
  ])
])
