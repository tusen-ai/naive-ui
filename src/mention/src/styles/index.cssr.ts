import fadeInScaleUp from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { c, cB } from '../../../_utils/cssr'

// --menu-box-shadow
export default c([
  cB('mention', 'width: 100%; z-index: auto; position: relative;'),
  cB('mention-menu', `
    box-shadow: var(--menu-box-shadow);
  `, [
    fadeInScaleUp()
  ])
])
