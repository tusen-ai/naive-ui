import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const {
      titleTextColor,
      textColor,
      color,
      borderRadius,
      strongFontWeight,
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
          background-color .3s ${easeInOutCubicBezier},
          color .3s ${easeInOutCubicBezier}
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
            transition: color .3s ${easeInOutCubicBezier};
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: ${strongFontWeight};
            color: ${titleTextColor}
          `
        },
        [
          cB('confirm-title-icon', {
            raw: `
              vertical-align: middle;
              margin-right: 8px;
            `
          },
          [
            cM('warning-type', {
              raw: `
                fill: ${iconColorWarning};
                stroke: ${iconColorWarning};
              `
            }),
            cM('success-type', {
              raw: `
                fill: ${iconColorSuccess};
                stroke: ${iconColorSuccess};
              `
            }),
            cM('error-type', {
              raw: `
                fill: ${iconColorError};
                stroke: ${iconColorError};
              `
            }),
            cM('info-type', {
              raw: `
                fill: ${iconColorInfo};
                stroke: ${iconColorInfo};
              `
            })
          ]),
          cB('confirm-title-content', {
            raw: `
              display: flex;
              align-items: center;
            `
          }),
          cE('close', {
            raw: `
              fill: ${closeColor},
              stroke: ${closeColor}
            `
          },
          [
            c('&:hover', {
              raw: `
                fill: ${closeColorHover},
                stroke: ${closeColorHover}
              `
            }),
            c('&:active', {
              raw: `
                fill: ${closeColorActive},
                stroke: ${closeColorActive}
              `
            })
          ])
        ])
      ]
    )
  }
])
