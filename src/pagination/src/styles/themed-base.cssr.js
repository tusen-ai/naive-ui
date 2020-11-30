import { cTB, c, cB, cE, cM, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      buttonBorder,
      itemTextColor,
      itemTextColorHover,
      itemTextColorActive,
      itemTextColorDisabled,
      itemColor,
      itemColorHover,
      itemColorActive,
      itemColorDisabled,
      itemBorder,
      itemBorderActive,
      itemBorderDisabled,
      jumperTextColorDisabled,
      itemBorderRadius,
      itemPadding,
      buttonIconColor,
      buttonIconColorHover,
      itemSize,
      buttonFontSize,
      itemFontSize,
      inputWidth,
      selectWidth,
      inputMargin,
      itemMargin
    } = props.$local
    const {
      cubicBezierEaseInOut
    } = props.$global
    return cTB('pagination', {
      raw: `
        display: flex;
        vertical-align: middle;
        font-size: ${itemFontSize}
      `
    }, [
      c('> *:not(:last-child)', {
        marginRight: '8px'
      }),
      cB('select', {
        width: selectWidth
      }),
      cM('transition-disabled', [
        cB('pagination-item', {
          transition: 'none'
        })
      ]),
      cB('pagination-quick-jumper', {
        raw: `
          white-space: nowrap;
          display: flex;
          line-height: ${itemSize};
          color: ${itemTextColor};
          transition: color .3s ${cubicBezierEaseInOut};
        `
      }, [
        cB('input', {
          raw: `
            margin: ${inputMargin};
            width: ${inputWidth};
          `
        }, [
          cE('placeholder', {
            left: '6px',
            right: '10px'
          }),
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
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          line-height: 28px;
          min-width: ${itemSize};
          height: ${itemSize};
          padding: ${itemPadding};
          background-color: ${itemColor};
          color: ${itemTextColor};
          border-radius: ${itemBorderRadius};
          border: ${itemBorder};
          fill: ${buttonIconColor};
          transition:
            color .3s ${cubicBezierEaseInOut},
            border-color .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut},
            fill .3s ${cubicBezierEaseInOut};
        `
      }, [
        c('&:not(:last-child)', {
          margin: itemMargin
        }),
        cE('more-icon, arrow-icon', {
          raw: `
            position: relative;
            z-index: auto;
            font-size: ${buttonFontSize};
            width: 1em;
            height: 1em;
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
          c('&:hover', {
            backgroundColor: itemColor
          }),
          cE('more-icon', {
            display: 'block'
          }),
          cE('arrow-icon', {
            display: 'none'
          })
        ]),
        cE('more-icon, arrow-icon', {
          lineHeight: 0
        }),
        cM('active', {
          background: itemColorActive,
          color: itemTextColorActive,
          border: itemBorderActive
        }),
        cM('backward, forward', {
          backgroundColor: itemColor,
          border: buttonBorder
        }),
        cNotM('disabled', [
          c('&:hover', {
            color: itemTextColorHover,
            backgroundColor: itemColorHover,
            fill: buttonIconColorHover
          }, [
            cM('backward, forward', {
              color: itemTextColor
            }),
            cM('fast-backward, fast-forward', {
              color: itemTextColor
            }, [
              cE('more-icon', {
                display: 'none'
              }),
              cE('arrow-icon', {
                display: 'block'
              })
            ])
          ])
        ]),
        cM('disabled', {
          raw: `
            cursor: not-allowed;
            fill: ${itemTextColorDisabled};
            color: ${itemTextColorDisabled};
          `
        }, [
          cM('active, backward, forward', {
            backgroundColor: itemColorDisabled,
            border: itemBorderDisabled
          })
        ])
      ]),
      cM('disabled', {
        cursor: 'not-allowed'
      }, [
        cB('pagination-quick-jumper', {
          color: jumperTextColorDisabled
        })
      ])
    ])
  }
])
