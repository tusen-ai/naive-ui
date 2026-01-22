import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { c, cB } from '../../../_utils/cssr'

// --n-menu-box-shadow
// --n-bezier
// --n-duration
export default c([
  cB('select', `
    z-index: auto;
    outline: none;
    width: 100%;
    position: relative;
    font-weight: var(--n-font-weight);
  `),
  cB('select-menu', `
    margin: 4px 0;
    box-shadow: var(--n-menu-box-shadow);
  `, [
    fadeInScaleUpTransition({
      originalTransition: 'background-color var(--n-duration) var(--n-bezier), box-shadow var(--n-duration) var(--n-bezier)'
    })
  ])
])
