import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      pTextColor,
      pTextColorPrimaryDepth,
      pTextColorSecondaryDepth,
      pTextColorTertiaryDepth
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
      cM('primary-depth', {
        color: pTextColorPrimaryDepth
      }),
      cM('secondary-depth', {
        color: pTextColorSecondaryDepth
      }),
      cM('tertiary-depth', {
        color: pTextColorTertiaryDepth
      })
    ])
  }
])
