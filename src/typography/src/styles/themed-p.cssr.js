import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      pFontSize,
      pLineHeight,
      pMargin,
      pTextColor,
      pTextColor1Depth,
      pTextColor2Depth,
      pTextColor3Depth
    } = props.$local
    return cTB('p', {
      raw: `
        box-sizing: border-box;
        transition: color .3s ${cubicBezierEaseInOut};
        margin: ${pMargin};
        font-size: ${pFontSize};
        line-height: ${pLineHeight};
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
