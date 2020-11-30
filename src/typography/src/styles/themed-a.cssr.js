import { c, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$global
    const {
      aTextColor
    } = props.$local
    return cTB('a', {
      cursor: 'pointer',
      transition: `
        color .3s ${cubicBezierEaseInOut},
        text-decoration-color .3s ${cubicBezierEaseInOut}
      `,
      textDecorationColor: aTextColor,
      color: aTextColor
    })
  }
])
