import { cTB, c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      itemTextColor,
      itemTextColorHover,
      itemTextColorActive,
      itemTextColorDisabled,
      itemColor,
      itemColorActive,
      itemColorDisabled,
      itemBorderColor,
      itemBorderColorActive,
      itemBorderColorDisabled,
      jumperTextColorDisabled,
      itemBorderRadius
    } = props.$local
    const {
      cubicBezierEaseInOut
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
          transition: color .3s ${cubicBezierEaseInOut};
        `,
        color: itemTextColor
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
            color .3s ${cubicBezierEaseInOut},
            box-shadow .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut},
            opacity .3s ${cubicBezierEaseInOut},
            fill .3s ${cubicBezierEaseInOut};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: ${itemBorderRadius};
          line-height: 28px;
        `,
        color: itemTextColor,
        fill: itemTextColor
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
          background: itemColorActive,
          color: itemTextColorActive,
          boxShadow: `inset 0 0 0 1px ${itemBorderColorActive}`
        }),
        cM('backward, forward', {
          backgroundColor: itemColor,
          boxShadow: `inset 0 0 0 1px  ${itemBorderColor}`
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
            backgroundColor: itemColorDisabled,
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
          color: jumperTextColorDisabled
        })
      ])
    ])
  }
])
