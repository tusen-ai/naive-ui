import { c, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { fontFamilyMono, cubicBezierEaseInOut } = props.$base
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
            font-family: ${fontFamilyMono};
          `
        },
        [
          c('code', {
            fontFamily: fontFamilyMono
          }),
          c('[class^=hljs]', {
            color: textColor,
            transition: `
              color .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut}
            `
          }),
          highlightStyle
        ]
      )
    ]
  }
])
