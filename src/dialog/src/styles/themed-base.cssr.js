import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const cubicBezierEaseInOut = base.cubicBezierEaseInOut
    const {
      titleTextColor,
      textColor,
      color,
      borderRadius,
      titleFontWeight,
      closeColor,
      closeColorHover,
      closeColorActive,
      iconColorInfo,
      iconColorSuccess,
      iconColorWarning,
      iconColorError
    } = props.$local
    return cTB(
      'confirm',
      {
        raw: `
          background: ${color};
          color: ${textColor};
          box-sizing: border-box;
          margin: auto;
          border-radius: ${borderRadius};
          padding: 28px;
          padding-bottom: 20px;
          padding-top: 16px;
        `,
        transition: `
          background-color .3s ${cubicBezierEaseInOut},
          color .3s ${cubicBezierEaseInOut}
        `
      },
      [
        cE('content', {
          raw: `
            font-size: 15px;
            padding-right: 9px;
            margin-top: 10px;
            margin-bottom: 19px;
            position: relative;
          `
        }),
        cE('footer', {
          raw: `
            display: flex;
            justify-content: flex-end;
          `
        }),
        cB('confirm-title', {
          raw: `
            transition: color .3s ${cubicBezierEaseInOut};
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: ${titleFontWeight};
            color: ${titleTextColor}
          `
        },
        [
          cB('confirm-title-icon', {
            raw: `
              vertical-align: middle;
              margin-right: 8px;
              transition: color .3s ${cubicBezierEaseInOut};
            `
          },
          [
            cM('warning-type', {
              color: iconColorWarning
            }),
            cM('success-type', {
              color: iconColorSuccess
            }),
            cM('error-type', {
              color: iconColorError
            }),
            cM('info-type', {
              color: iconColorInfo
            })
          ]),
          cB('confirm-title-content', {
            raw: `
              display: flex;
              align-items: center;
            `
          }),
          cE('close', {
            color: closeColor,
            transition: `color .3s ${cubicBezierEaseInOut}`
          },
          [
            c('&:hover', {
              color: closeColorHover
            }),
            c('&:active', {
              color: closeColorActive
            })
          ])
        ])
      ]
    )
  }
])
