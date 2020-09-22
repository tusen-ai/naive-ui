import { c, cTB, cM, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut,
      fontWeightStrong,
      fontFamilyMono
    } = props.$base
    const {
      textColor,
      textColorStrong,
      textColorPrimaryDepth,
      textColorSecondaryDepth,
      textColorTertiaryDepth,
      textColorPrimary,
      textColorInfo,
      textColorSuccess,
      textColorWarning,
      textColorError,
      textOpacityPrimaryDepth,
      textOpacitySecondaryDepth,
      textOpacityTertiaryDepth,
      codeBorderRadius,
      codeTextColor,
      codeColor,
      codeBorderColor
    } = props.$local
    return cTB('text', {
      transition: `color .3s ${cubicBezierEaseInOut}`,
      color: textColor
    }, [
      cM('strong', {
        fontWeight: fontWeightStrong,
        color: textColorStrong
      }),
      cM('italic', {
        fontStyle: 'italic'
      }),
      cM('underline', {
        textDecoration: 'underline'
      }),
      cM('code', {
        lineHeight: 1.4,
        fontFamily: fontFamilyMono,
        transition: `
          color .3s ${cubicBezierEaseInOut},
          border-color .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut}
        `,
        boxSizing: 'border-box',
        padding: '.15em .45em 0 .45em',
        borderRadius: codeBorderRadius,
        fontSize: '.9em',
        color: codeTextColor,
        backgroundColor: codeColor,
        border: `1px solid ${codeBorderColor}`
      }),
      cM('default-type', [
        cM('primary-depth', {
          color: textColorPrimaryDepth
        }),
        cM('secondary-depth', {
          color: textColorSecondaryDepth
        }),
        cM('tertiary-depth', {
          color: textColorTertiaryDepth
        })
      ]),
      cNotM('default-type', [
        cM('primary-depth', {
          color: textOpacityPrimaryDepth
        }),
        cM('secondary-depth', {
          color: textOpacitySecondaryDepth
        }),
        cM('tertiary-depth', {
          color: textOpacityTertiaryDepth
        })
      ]),
      cM('primary-type', {
        color: textColorPrimary
      }),
      cM('info-type', {
        color: textColorInfo
      }),
      cM('success-type', {
        color: textColorSuccess
      }),
      cM('warning-type', {
        color: textColorWarning
      }),
      cM('error-type', {
        color: textColorError
      })
    ])
  }
])
