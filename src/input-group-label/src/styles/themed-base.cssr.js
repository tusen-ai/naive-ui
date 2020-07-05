import { cTB2, c } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier
    } = props.$base
    const {
      borderRadius,
      backgroundColor,
      textColor,
      boxShadow
    } = props.$local
    return cTB2('input-group-label', {
      userSelect: 'none',
      boxSizing: 'border-box',
      padding: '0 12px',
      display: 'inline-block',
      borderRadius,
      backgroundColor,
      color: textColor,
      boxShadow,
      transition: `
        color .3s ${easeInOutCubicBezier},
        background-color .3s ${easeInOutCubicBezier},
        box-shadow .3s ${easeInOutCubicBezier}
      `
    })
  }
])
