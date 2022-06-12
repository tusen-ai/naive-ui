import { fadeInScaleUpTransition } from '../../../_styles/transitions/fade-in-scale-up.cssr'
import { c, cB } from '../../../_utils/cssr'

// --n-menu-box-shadow
export default c([
  cB('mention', 'width: 100%; z-index: auto; position: relative;'),
  cB('mention-menu', `
    box-shadow: var(--n-menu-box-shadow);
  `, [
    fadeInScaleUpTransition({
      originalTransition: 'background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)'
    })
  ])
])
