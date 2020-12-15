import { c, cTB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut,
        fontWeightStrong,
        fontFamilyMono
      },
      $local: {
        textColor,
        textColorStrong,
        textColor1Depth,
        textColor2Depth,
        textColor3Depth,
        textColor1,
        textColorInfo,
        textColorSuccess,
        textColorWarning,
        textColorError,
        codeBorderRadius,
        codeTextColor,
        codeColor,
        codeBorderColor
      }
    } = props
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
        display: 'inline-block',
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
        cM('1-depth', {
          color: textColor1Depth
        }),
        cM('2-depth', {
          color: textColor2Depth
        }),
        cM('3-depth', {
          color: textColor3Depth
        })
      ]),
      cM('primary-type', {
        color: textColor1
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
