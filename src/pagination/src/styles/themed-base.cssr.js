import { cTB, c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      itemTextColorDefault,
      itemTextColorHover,
      itemTextColorActive,
      itemTextColorDisabled,
      itemBackgroundColorDefault,
      itemBackgroundColorActive,
      itemBackgroundColorDisabled,
      itemBorderColorDefault,
      itemBorderColorActive,
      itemBorderColorDisabled,
      textColorDisabled,
      borderRadius
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('pagination', {
      raw: `
        display: flex;
        vertical-align: middle;
      `
    }, [
      cB('select', {
        raw: `
          width: unset;
        `
      }),
      cM('transition-disabled', [
        cB('pagination-item', {
          raw: `
            transition: none;
          `
        })
      ]),
      cB('pagination-quick-jumper', {
        raw: `
          white-space: nowrap;
          display: flex;
          width: 110px;
          line-height: 28px;
          transition: color .3s ${easeInOutCubicBezier};
        `,
        color: itemTextColorDefault
      }, [
        cB('input', {
          raw: `
            margin: 0 8px;
          `
        }, [
          c('input', {
            raw: `
              padding-left: 6px;
              padding-right: 10px;
            `
          })
        ])
      ]),
      cB('pagination-item', {
        raw: `
          position: relative;
          cursor: pointer;
          user-select: none;
          min-width:28px;
          height:28px;
          padding-left: 4px;
          padding-right: 4px;
          box-sizing: border-box;
          opacity: 1;
          transition:
            color .3s ${easeInOutCubicBezier},
            box-shadow .3s ${easeInOutCubicBezier},
            background-color .3s ${easeInOutCubicBezier},
            opacity .3s ${easeInOutCubicBezier},
            fill .3s ${easeInOutCubicBezier};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: ${borderRadius};
          line-height: 28px;
        `,
        color: itemTextColorDefault,
        fill: itemTextColorDefault
      }, [
        c('&:not(:last-child)', {
          raw: `
            margin-right: 8px;
          `
        }),
        cE('more-icon, arrow-icon', {
          raw: `
            position: relative;
            z-index: auto;
            width: 16px;
            height: 16px;
          `
        }, [
          cB('base-icon', {
            raw: `
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
            `
          })
        ]),
        cM('fast-backward, fast-forward', [
          cE('more-icon', {
            raw: `
             display: block;
            `
          }),
          cE('arrow-icon', {
            raw: `
             display: none;
            `
          })
        ]),
        cM('active', {
          background: itemBackgroundColorActive,
          color: itemTextColorActive,
          boxShadow: `inset 0 0 0 1px ${itemBorderColorActive}`
        }),
        cM('backward, forward', {
          backgroundColor: itemBackgroundColorDefault,
          boxShadow: `inset 0 0 0 1px  ${itemBorderColorDefault}`
        }),
        cNotM('disabled', [
          c('&:hover', {
            color: itemTextColorHover
          }, [
            cM('fast-backward, fast-forward', [
              cE('more-icon', {
                raw: `
                  display: none;
                `
              }),
              cE('arrow-icon', {
                raw: `
                  display: block;
                `
              })
            ])
          ])
        ]),
        cM('disabled', {
          raw: `
            cursor: not-allowed;
          `,
          fill: itemTextColorDisabled,
          color: itemTextColorDisabled
        }, [
          cM('active, backward, forward', {
            backgroundColor: itemBackgroundColorDisabled,
            boxShadow: `inset 0 0 0 1px ${itemBorderColorDisabled}`
          })
        ])
      ]),
      cM('disabled', {
        raw: `
          cursor: not-allowed;
        `
      }, [
        cB('pagination-quick-jumper', {
          color: textColorDisabled
        })
      ])
    ])
  }
])
