import { c, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { monoFontFamily, easeInOutCubicBezier } = props.$base
    const {
      textColor,
      highlightStyle
    } = props.$local
    return [
      cTB(
        'code',
        {
          raw: `
            margin: 0;
            font-size: 14px;
            font-family: ${monoFontFamily};
          `
        },
        [
          c('code', {
            fontFamily: monoFontFamily
          }),
          c('[class^=hljs]', {
            color: textColor,
            transition: `
              color .3s ${easeInOutCubicBezier},
              background-color .3s ${easeInOutCubicBezier}
            `
          }),
          highlightStyle
        ]
      )
    ]
  }
])
