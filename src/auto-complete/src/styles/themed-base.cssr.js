import { c, cTB } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up.js'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      }
    } = props
    return cTB('auto-complete-menu', [
      fadeInScaleUpTransition({
        originalTransition: `background-color .3s ${cubicBezierEaseInOut}`
      })
    ])
  }
])
