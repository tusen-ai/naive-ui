import { cTB, c } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$global
    const {
      borderRadius,
      color: backgroundColor,
      textColor,
      boxShadow
    } = props.$local
    return cTB('input-group-label', {
      userSelect: 'none',
      boxSizing: 'border-box',
      padding: '0 12px',
      display: 'inline-block',
      borderRadius,
      backgroundColor,
      color: textColor,
      boxShadow,
      transition: `
        color .3s ${cubicBezierEaseInOut},
        background-color .3s ${cubicBezierEaseInOut},
        box-shadow .3s ${cubicBezierEaseInOut}
      `
    })
  }
])
