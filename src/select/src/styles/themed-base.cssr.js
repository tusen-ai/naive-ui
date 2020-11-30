import { cTB, c } from '../../../_utils/cssr'
import fadeInScaleUpTransition from '../../../_styles/transitions/fade-in-scale-up'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut, transformDebounceScale } = props.$global
    return [
      cTB('select', {
        raw: `
          z-index: auto;
          outline: none;
          width: 100%;
        `
      }),
      cTB('select-menu', {
        transform: transformDebounceScale
      }, [
        fadeInScaleUpTransition({
          originalTransition: `background-color .3s ${cubicBezierEaseInOut}`
        })
      ])
    ]
  }
])
