import { c, cTB, cB, cE, cM, insideModal, cNotM, createKey } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut,
      transformDebounceScale
    } = props.$base
    const {
      borderRadius,
      color,
      colorDisabled,
      colorTableHeader,
      colorTableHeaderModal,
      iconColor,
      iconColorDisabled,
      borderColor,
      borderColorDisabled,
      borderColorActive,
      boxShadowColorActive,
      labelTextColor,
      labelTextColorDisabled
    } = props.$local
    return [
      // checkbox
      cTB(
        'checkbox',
        {
          raw: `
            line-height: 1;
            outline: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            white-space: nowrap;
          `
        },
        [
          cB('checkbox-box', {
            raw: `
              display: inline-block;
              box-sizing: border-box;
              border-radius: ${borderRadius};
              position: relative;
              transition:
                box-shadow 0.3s ${cubicBezierEaseInOut},
                background-color 0.3s ${cubicBezierEaseInOut};
            `
          }, [
            cB('checkbox-icon', {
              raw: `
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                transform: ${transformDebounceScale};
              `
            }, [
              cE('line, check', {
                raw: `
                  width: calc(100% - 2px);
                  opacity: 0;
                  transform: scale(0.5);
                  transform-origin: center;
                  transition:
                    fill 0.3s ${cubicBezierEaseInOut},
                    transform 0.3s ${cubicBezierEaseInOut},
                    opacity 0.3s ${cubicBezierEaseInOut},
                    border-color 0.3s ${cubicBezierEaseInOut};
                `
              }),
              iconSwitchTransition()
            ])
          ]),
          cE('label', {
            raw: `
              transition: color .3s ${cubicBezierEaseInOut};
              user-select: none;
              padding-left: 8px;
            `
          }, [
            c('&:empty', {
              display: 'none'
            })
          ]),
          cM('checked', [
            cB('checkbox-box', [
              cB('checkbox-icon', [
                cE('check', {
                  raw: `
                    opacity: 1;
                    transform: scale(1);
                  `
                })
              ])
            ])
          ]),
          cM('indeterminate', [
            cB('checkbox-box', [
              cB('checkbox-icon', [
                cE('check', {
                  raw: `
                    opacity: 0;
                    transform: scale(.5);
                  `
                }),
                cE('line', {
                  raw: `
                    opacity: 1;
                    transform: scale(1);
                  `
                })
              ])
            ])
          ]),
          cM('disabled', {
            cursor: 'not-allowed'
          }),
          ['small', 'medium', 'large'].map(size => {
            const fontSize = props.$local[createKey('fontSize', size)]
            const checkboxSize = props.$local[createKey('checkboxSize', size)]
            return cM(`${size}-size`, {
              fontSize
            }, [
              cB('checkbox-box', {
                raw: `
                  height: ${checkboxSize};
                  width: ${checkboxSize};
                `
              })
            ])
          })
        ]
      ),
      // checkbox-group
      cB('checkbox-group', {
        display: 'flex',
        flexWrap: 'wrap'
      }, [
        cB('checkbox', {
          marginRight: '18px'
        })
      ]),
      // modal table header checkbox
      insideModal(
        cTB('checkbox', [
          cM('table-header', [
            cNotM('checked', [
              cNotM('indeterminate', [
                cNotM('disabled', [
                  cB('checkbox-box', {
                    backgroundColor: colorTableHeaderModal
                  })
                ])
              ])
            ])
          ])
        ])
      ),
      cTB('checkbox', [
        c('&:hover', [
          cB('checkbox-box', {
            raw: `
              box-shadow: inset 0 0 0 1px ${borderColorActive};
            `
          })
        ]),
        c('&:focus:not(:active)', [
          cB('checkbox-box', {
            raw: `
              box-shadow: 
                inset 0 0 0 1px ${borderColorActive}, 
                0 0 0 2px ${boxShadowColorActive};
            `
          })
        ]),
        cB('checkbox-box', {
          raw: `
            background-color: ${color};
            box-shadow: inset 0 0 0 1px ${borderColor};
          `
        }, [
          cB('checkbox-icon', [
            cE('check, line', {
              fill: iconColor
            })
          ])
        ]),
        cE('label', {
          color: labelTextColor
        }),
        cM('table-header', [
          cB('checkbox-box', {
            backgroundColor: colorTableHeader
          })
        ]),
        cM('checked, indeterminate', [
          c('&:focus:not(:active)', [
            cB('checkbox-box', {
              raw: `
                box-shadow:
                  inset 0 0 0 1px ${borderColorActive},
                  0 0 0 2px ${boxShadowColorActive};
              `
            })
          ]),
          cB('checkbox-box', {
            raw: `
              background-color: ${borderColorActive};
              box-shadow: inset 0 0 0 1px ${borderColorActive};
              border-left: 0;
              border-top: 0;
            `
          })
        ]),
        cM('disabled', [
          cB('checkbox-box', {
            raw: `
              background-color: ${colorDisabled};
              box-shadow: inset 0 0 0 1px ${borderColorDisabled};
            `
          }, [
            cB('checkbox-icon', [
              cE('check, line', {
                fill: iconColorDisabled
              })
            ])
          ]),
          cE('label', {
            color: labelTextColorDisabled
          })
        ])
      ])
    ]
  }
])
