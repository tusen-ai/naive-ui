import { c, cTB } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../styles/_transitions/fade-in-scale-up.js'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$base
    return cTB('auto-complete-menu', [
      fadeInScaleUpTransition({
        originalTransition: `background-color .3s ${cubicBezierEaseInOut}`
      })
    ])
  }
])
