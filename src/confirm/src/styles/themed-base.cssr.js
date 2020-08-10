import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const strongFontWeight = base.strongFontWeight
    const {
      confirmTitleTextColor,
      confirmTextColor,
      confirmBackgroundColor,
      borderRadius
    } = props.$local
    const {
      default: defaultConfirmCloseColor,
      hover: hoverConfirmCloseColor,
      active: activeConfirmCloseColor
    } = props.$local.confirmCloseColor
    const {
      info: infoConfirmIconColor,
      success: successConfirmIconColor,
      warning: warningConfirmIconColor,
      error: errorConfirmIconColor
    } = props.$local.confirmIconColor
    return cTB(
      'confirm',
      {
        raw: `
          background: ${confirmBackgroundColor};
          color: ${confirmTextColor};
          box-sizing: border-box;
          margin: auto;
          border-radius: ${borderRadius};
          padding: 28px;
          padding-bottom: 20px;
          padding-top: 16px;
        `,
        transition: `
          background-color .3s ${easeInOutCubicBezier},
          color .3s ${easeInOutCubicBezier};
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
            color: ${confirmTitleTextColor}
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
                fill: ${warningConfirmIconColor};
                stroke: ${warningConfirmIconColor};
              `
            }),
            cM('success-type', {
              raw: `
                fill: ${successConfirmIconColor};
                stroke: ${successConfirmIconColor};
              `
            }),
            cM('error-type', {
              raw: `
                fill: ${errorConfirmIconColor};
                stroke: ${errorConfirmIconColor};
              `
            }),
            cM('info-type', {
              raw: `
                fill: ${infoConfirmIconColor};
                stroke: ${infoConfirmIconColor};
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
              fill: ${defaultConfirmCloseColor},
              stroke: ${defaultConfirmCloseColor}
            `
          },
          [
            c('&:hover', {
              raw: `
                fill: ${hoverConfirmCloseColor},
                stroke: ${hoverConfirmCloseColor}
              `
            }),
            c('&:active', {
              raw: `
                fill: ${activeConfirmCloseColor},
                stroke: ${activeConfirmCloseColor}
              `
            })
          ])
        ])
      ]
    )
  }
])
