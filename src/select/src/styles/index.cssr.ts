import { cB, c } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  cB('select', `
    z-index: auto;
    outline: none;
    width: 100%;
  `),
  cB('select-menu', [
    fadeInScaleUpTransition()
  ])
])
