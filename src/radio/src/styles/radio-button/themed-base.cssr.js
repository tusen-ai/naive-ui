import { c, cTB, cB, cE, cM, cNotM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      buttonBorderColorDefault,
      buttonBorderColorActive,
      buttonBackgroundColorActive,
      buttonLabelColorDefault,
      buttonLabelColorActive,
      buttonLabelColorHover,
      disabledOpacity,
      borderMaskWidth,
      buttonBoxShadowFocus,
      buttonBoxShadowHover,
      buttonBorderRadius
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('radio-group', [
      cM('button-group', {
        raw: `
            white-space: nowrap;
            height: 28px;
            line-height: 28px;
          `
      }),
      cM('transition-disabled', [
        cB('radio-button', {
          raw: `
              transition: none !important;
            `
        })
      ]),
      cB('radio-button', {
        raw: `
            vertical-align: bottom;
            outline: none;
            position: relative;
            user-select: none;
            display: inline-block;
            height: 28px;
            line-height: 28px;
            box-sizing: border-box;
            padding-left: 14px;
            padding-right: 14px;
            white-space: nowrap;
            transition: background-color .3s ${easeInOutCubicBezier}, opacity .3s ${easeInOutCubicBezier}, border-color .3s ${easeInOutCubicBezier}, color .3s ${easeInOutCubicBezier};
          `,
        color: buttonLabelColorDefault,
        borderTop: `1px solid ${buttonBorderColorDefault}`,
        borderBottom: `1px solid ${buttonBorderColorDefault}`
      }, [
        cE('radio-input', {
          raw: `
              width: 0;
              height: 0;
              opacity: 0;
              margin: 0;
            `
        }),
        cE('border-mask', {
          raw: `
              pointer-events: none;
              position: absolute;
              box-shadow: inset 0 0 0 ${borderMaskWidth} transparent;
              transition: box-shadow .3s ${easeInOutCubicBezier};
              left: -1px;
              bottom: -1px;
              right: -1px;
              top: -1px;
            `
        }),
        c('&:first-child', {
          raw: `
              border-top-left-radius: ${buttonBorderRadius};
              border-bottom-left-radius: ${buttonBorderRadius};
            `,
          borderLeft: `1px solid ${buttonBorderColorDefault}`
        }, [
          cE('border-mask', {
            raw: `
                border-top-left-radius: ${buttonBorderRadius};
                border-bottom-left-radius: ${buttonBorderRadius};
              `
          })
        ]),
        c('&:last-child', {
          raw: `
              border-top-right-radius: ${buttonBorderRadius};
              border-bottom-right-radius: ${buttonBorderRadius};
            `,
          borderRight: `1px solid ${buttonBorderColorDefault}`
        }, [
          cE('border-mask', {
            raw: `
                border-top-right-radius: ${buttonBorderRadius};
                border-bottom-right-radius: ${buttonBorderRadius};
              `
          })
        ]),
        cNotM('disabled', {
          raw: `
              cursor: pointer;
            `
        }, [
          c('&:hover', [
            cE('border-mask', {
              raw: `
                  transition: box-shadow .3s ${easeInOutCubicBezier};
                `,
              boxShadow: buttonBoxShadowHover
            }),
            cNotM('checked', {
              color: buttonLabelColorHover
            })
          ]),
          cM('focus', [
            c('&:not(:active)', [
              cE('border-mask', {
                boxShadow: buttonBoxShadowFocus
              })
            ])
          ])
        ]),
        cM('checked', {
          backgroundColor: buttonBackgroundColorActive,
          color: buttonLabelColorActive,
          borderColor: buttonBorderColorActive
        }),
        cM('disabled', {
          raw: `
              cursor: not-allowed;
            `,
          opacity: disabledOpacity
        })
      ])
    ])
  }
])
