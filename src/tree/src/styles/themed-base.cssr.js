import { c, cTB, cB, cE, cM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../_styles/transitions/fade-in-height-expand'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local: {
        nodeColorHover,
        nodeColorPressed,
        nodeColorSelected,
        arrowColor,
        nodeTextColor,
        nodeTextColorDisabled,
        borderRadiusSmall,
        fontSize
      }
    } = props
    return [
      cTB('tree', {
        fontSize
      }, [
        c('ul, li', {
          raw: `
            margin: 0;
            padding: 0;
            list-style: none;
          `
        }),
        c('>', [
          cB('tree-node', [
            c('&:first-child', {
              paddingTop: 0
            })
          ])
        ]),
        cB('tree-children-wrapper', {
          marginLeft: '16px'
        }, [
          fadeInHeightExpandTransition({ duration: '0.15s' })
        ]),
        cB('tree-node', {
          padding: '6px 0 0 0'
        }),
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
              color: ${arrowColor};
              transition: color .3s ${cubicBezierEaseInOut};
            `
          }, [
            cB('icon', {
              fontSize: '14px'
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
            visibility: 'hidden'
          }),
          cM('expanded', {
            transform: 'rotate(90deg)'
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
            marginBottom: 0
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
            width: 'calc(100% - 24px)'
          }, [
            cM('checkable', {
              width: 'calc(100% - 48px)'
            })
          ]),
          c('&:hover', {
            backgroundColor: nodeColorHover
          }),
          c('&:active', {
            backgroundColor: nodeColorPressed
          }),
          cM('hightlight', [
            cE('text', {
              borderBottomColor: nodeTextColorDisabled
            })
          ]),
          cM('pending', [
            c('&:hover', {
              backgroundColor: 'transparent'
            }),
            cM('pending-bottom', {
              borderBottom: `3px solid ${nodeColorHover}`
            }),
            cM('pending-top', {
              borderTop: `3px solid ${nodeColorHover}`
            }),
            cM('pending-body', {
              backgroundColor: nodeColorHover
            })
          ]),
          cM('selected', {
            backgroundColor: nodeColorSelected
          })
        ])
      ])
    ]
  }
])
