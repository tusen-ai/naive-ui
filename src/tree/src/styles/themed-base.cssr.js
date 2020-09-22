import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../styles/_transitions/fade-in-height-expand'
import iconSwitchTransition from '../../../styles/_transitions/icon-switch'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$base
    const {
      nodeColorHover,
      nodeColorActive,
      nodeColorSelected,
      arrowColor,
      nodeTextColor,
      nodeTextColorDisabled,
      borderRadiusSmall
    } = props.$local
    return [
      cTB('tree', {
        raw: `
          font-size: 14px;
        `
      }, [
        c('ul, li', {
          raw: `
            margin: 0;
            padding: 0;
            list-style: none;
          `
        }),
        cB('tree-children-wrapper', {
          raw: `
            margin-left: 16px;
          `
        }, [
          fadeInHeightExpandTransition({ duration: '0.15s' })
        ]),
        cB('tree-node', {
          raw: `
            padding: 3px 0 3px 0;
          `
        }, [
          c('&:first-child', {
            raw: `
              padding-top: 6px;
            `
          }),
          c('&:last-child', {
            raw: `
              padding-top: 6px;
            `
          })
        ]),
        cB('tree-node-switcher', {
          raw: `
            cursor: pointer;
            display: inline-flex;
            height: 24px;
            width: 24px;
            align-items: center;
            justify-content: center;
            transition: transform .15s ${cubicBezierEaseInOut};
            vertical-align: bottom;
          `
        }, [
          cE('icon', {
            raw: `
              position: relative;
              height: 14px;
              width: 14px;
              display: flex;
            `
          }, [
            cB('icon', {
              raw: `
                height: 14px;
                width: 14px;
                font-size: 14px;
                fill: ${arrowColor};
                stroke: ${arrowColor};
              `
            }, [
              iconSwitchTransition()
            ]),
            cB('base-loading', {
              raw: `
                position: absolute;
                left: 1px;
                top: 1px;
                height: 12px;
                width: 12px;
              `
            }, [
              iconSwitchTransition({ left: '1px', top: '1px' })
            ])
          ]),
          cM('hide', {
            raw: `
              visibility: hidden
            `
          }),
          cM('expanded', {
            raw: `
              transform: rotate(90deg);
            `
          })
        ]),
        cB('tree-node-checkbox', {
          raw: `
            display: inline-flex;
            height: 24px;
            width: 16px;
            vertical-align: bottom;
            align-items: center;
            justify-content: center;
            margin-right: 4px;
          `
        }),
        cB('tree-node-content', {
          raw: `
            position: relative;
            display: inline-flex;
            height: 24px;
            box-sizing: border-box;
            border-bottom: 3px solid transparent;
            border-top: 3px solid transparent;
            line-height: 24px;
            align-items: center;
            vertical-align: bottom;
            padding: 0 6px;
            cursor: pointer;
            border-radius: ${borderRadiusSmall};
            text-decoration-color: transparent;
            text-decoration-line: underline;
            color: ${nodeTextColor};
            transition:
              color .3s ${cubicBezierEaseInOut},
              text-decoration-color .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut},
              border-color .3s ${cubicBezierEaseInOut};
          `
        }, [
          c('&:last-child', {
            raw: `
              margin-bottom: 0;
            `
          }),
          cE('padding-box', {
            raw: `
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: transparent;
            `
          }),
          cE('text', {
            raw: `
              line-height: 1.25;
              border-bottom: 1px solid transparent;
              transition: border-color .3s ${cubicBezierEaseInOut};
            `
          }),
          cM('block', {
            raw: `
              width: calc(100% - 24px);
            `
          }, [
            cM('checkable', {
              raw: `
                width: calc(100% - 48px);
              `
            })
          ]),
          c('&:hover', {
            raw: `
              background-color: ${nodeColorHover};
            `
          }),
          c('&:active', {
            raw: `
              background-color: ${nodeColorActive};
            `
          }),
          cM('hightlight', [
            cE('text', {
              raw: `
                border-bottom-color: ${nodeTextColorDisabled};
              `
            })
          ]),
          cM('pending', [
            c('&:hover', {
              raw: `
                background-color: transparent;
              `
            }),
            cM('pending-bottom', {
              raw: `
                border-bottom: 3px solid ${nodeColorHover};
              `
            }),
            cM('pending-top', {
              raw: `
                border-top: 3px solid ${nodeColorHover};
              `
            }),
            cM('pending-body', {
              raw: `
                background-color: ${nodeColorHover};
              `
            })
          ]),
          cM('selected', {
            raw: `
              background-color: ${nodeColorSelected};
            `
          })
        ])
      ])
    ]
  }
])
