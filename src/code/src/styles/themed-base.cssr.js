import { c, cTB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        fontFamilyMono,
        cubicBezierEaseInOut
      },
      $local: {
        textColor,
        highlightStyle,
        fontSize
      }
    } = props
    return [
      cTB(
        'code',
        {
          raw: `
            margin: 0;
            font-size: ${fontSize};
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
