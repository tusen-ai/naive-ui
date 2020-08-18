import { c, cTB, cB, cE, cM, insideModal, cNotM } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../styles/_transitions/icon-switch'

export default c([
  ({ props }) => {
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const {
      transformDebounceScale
    } = props.$local
    return cTB(
      'checkbox',
      {
        raw: `
          line-height: 1.25;
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
            border-radius: 4px;
            position: relative;
            transition:
              box-shadow 0.3s ${easeInOutCubicBezier},
              background-color 0.3s ${easeInOutCubicBezier};
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
                  fill 0.3s ${easeInOutCubicBezier},
                  transform 0.3s ${easeInOutCubicBezier},
                  opacity 0.3s ${easeInOutCubicBezier},
                  border-color 0.3s ${easeInOutCubicBezier};
              `
            }),
            iconSwitchTransition()
          ])
        ]),
        cE('label', {
          raw: `
            transition: color .3s ${easeInOutCubicBezier};
            user-select: none;
            padding-left: 8px;
          `
        }),
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
                  opacity: 1;
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
          raw: `
            cursor: not-allowed;
          `
        })
      ]
    )
  },
  cTB('checkbox-group', {
    raw: `
      font-size: 14px;
      line-height: 1.25;
    `
  }, [
    cB('checkbox', {
      raw: `
        margin-right: 18px;
      `
    })
  ]),
  insideModal(({ props }) => {
    const {
      color
    } = props.$local
    return cB('checkbox', [
      cM('table-header', [
        cNotM('checked', [
          cNotM('indeterminate', [
            cNotM('disabled', [
              cB('checkbox-box', {
                raw: `
                  background-color: ${color.modalTable}
                `
              })
            ])
          ])
        ])
      ])
    ])
  }),
  ({ props }) => {
    const {
      borderColor,
      color,
      iconColor,
      labelTextColor
    } = props.$local
    return cB('checkbox', [
      c('&:hover', [
        cB('checkbox-box', {
          raw: `
            box-shadow: inset 0 0 0 1px ${borderColor.active};
          `
        })
      ]),
      c('&:focus:not(:active)', [
        cB('checkbox-box', {
          raw: `
            box-shadow: 
              inset 0 0 0 1px ${borderColor.active}, 
              0 0 0 2px ${borderColor.boxShadow};
          `
        })
      ]),
      cB('checkbox-box', {
        raw: `
          background-color: ${color.default};
          box-shadow: inset 0 0 0 1px ${borderColor.default};
        `
      }, [
        cB('checkbox-icon', [
          cE('check, line', {
            raw: `
              fill: ${iconColor.default};
            `
          })
        ])
      ]),
      cE('label', {
        raw: `
          color: ${labelTextColor.default};
        `
      }),
      cM('checked, indeterminate', [
        c('&:focus:not(:active)', [
          cB('checkbox-box', {
            raw: `
              box-shadow: inset 0 0 0 1px ${borderColor.active}, 0 0 0 2px ${borderColor.boxShadow};
            `
          })
        ]),
        cB('checkbox-box', {
          raw: `
            background-color: ${borderColor.active};
            box-shadow: inset 0 0 0 1px ${borderColor.active};
            border-left: 0;
            border-top: 0;
          `
        })
      ]),
      cM('disabled', [
        cB('checkbox-box', {
          raw: `
            background-color: ${color.disabled};
            box-shadow: inset 0 0 0 1px ${borderColor.disabled};
          `
        }, [
          cB('checkbox-icon', [
            cE('check, line', {
              raw: `
                fill: ${iconColor.disabled};
              `
            })
          ])
        ]),
        cE('label', {
          raw: `
            color: ${labelTextColor.disabled};
          `
        })
      ])
    ])
  }
])
