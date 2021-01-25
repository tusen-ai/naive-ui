import { cB } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

// vars:
// --bezier
export default cB('auto-complete-menu', [
  fadeInScaleUpTransition({
    originalTransition: 'background-color .3s var(--bezier)'
  })
])
