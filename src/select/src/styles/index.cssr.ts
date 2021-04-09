import { cB, c } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

// --menu-box-shadow
export default c([
  cB('select', `
    z-index: auto;
    outline: none;
    width: 100%;
    position: relative;
  `),
  cB('select-menu', `
    margin: 4px 0;
    box-shadow: var(--menu-box-shadow);
  `, [
    fadeInScaleUpTransition()
  ])
])
