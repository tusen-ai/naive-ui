import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      pTextColor,
      pTextColor1Depth,
      pTextColor2Depth,
      pTextColor3Depth
    } = props.$local
    return cTB('p', {
      raw: `
        box-sizing: border-box;
        transition: color .3s ${cubicBezierEaseInOut};
        margin: 12px 0 16px 0;
        font-size: 14px;
        line-height: 1.75;
      `,
      color: pTextColor
    }, [
      c('&:first-child', {
        marginTop: 0
      }),
      cM('1-depth', {
        color: pTextColor1Depth
      }),
      cM('2-depth', {
        color: pTextColor2Depth
      }),
      cM('3-depth', {
        color: pTextColor3Depth
      })
    ])
  }
])
