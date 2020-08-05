import { c, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier
    } = props.$base
    const {
      aTextColor
    } = props.$local
    return cTB('a', {
      cursor: 'pointer',
      transition: `
        color .3s ${easeInOutCubicBezier},
        text-decoration-color .3s ${easeInOutCubicBezier}
      `,
      textDecorationColor: aTextColor,
      color: aTextColor
    })
  }
])
