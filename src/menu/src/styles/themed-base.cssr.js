import { c, cTB, cB, cE, cM, cNotM } from '../../../_utils/cssr'
import fadeInHeightExpandTransition from '../../../styles/_transitions/fade-in-height-expand'

export default c([
  ({ props }) => {
    const {
      itemTextColor,
      itemTextColorHover,
      itemTextColorChildSelected,
      groupTextColor,
      borderColorHorizontal,
      itemIconColor,
      itemIconColorHover,
      itemIconColorCollapsed,
      itemIconColorSelected,
      itemIconColorChildSelected,
      itemColorMatch,
      itemTextColorSelected,
      itemExtraTextColor,
      itemExtraTextColorHover,
      itemExtraTextColorSelected,
      itemExtraTextColorChildSelected,
      submenuArrowColor,
      borderRadius
    } = props.$local
    const {
      easeInOutCubicBezier
    } = props.$base
    return cTB('menu', {
      color: itemTextColor,
      overflow: 'hidden',
      transition: `background-color .3s ${easeInOutCubicBezier}`,
      width: '100%',
      boxSizing: 'border-box',
      fontSize: '14px',
      paddingBottom: '6px'
    }, [
      cM('transition-disabled', [
        cB('menu-item-content', [
          cE('icon', [
            cB('icon', {
              transition: 'none !important'
            })
          ])
        ]),
        cB('menu-item-content-header', {
          transition: 'none !important'
        }, [
          cE('extra', {
            transition: 'none !important'
          })
        ])
      ]),
      cM('horizontal', {
        display: 'flex'
      }, [
        cB('submenu', {
          margin: 0
        }),
        cB('menu-item', {
          margin: 0
        }, [
          c('&::after', {
            backgroundColor: 'transparent !important'
          }),
          cM('selected', [
            cB('menu-item-content', {
              borderBottom: `2px solid ${borderColorHorizontal}`
            })
          ])
        ]),
        cB('menu-item-content', {
          padding: '0 20px',
          borderBottom: '2px solid transparent'
        }, [
          cM('child-selected', {
            borderBottom: `2px solid ${borderColorHorizontal}`
          }),
          cNotM('disabled', [
            hoverStyle({
              borderBottom: `2px solid ${borderColorHorizontal}`
            })
          ])
        ])
      ]),
      cM('collapsed', [
        cB('menu-item', [
          c('&::after', {
            backgroundColor: 'transparent !important'
          })
        ]),
        cB('menu-item-content', [
          cB('menu-item-content-header', {
            opacity: 0
          }),
          cE('arrow', {
            opacity: 0
          }),
          cE('icon', [
            cB('icon', {
              fill: itemIconColorCollapsed,
              stroke: itemIconColorCollapsed
            })
          ])
        ])
      ]),
      cB('menu-item', {
        transition: `background-color .3s ${easeInOutCubicBezier}`,
        height: '42px',
        marginTop: '6px',
        position: 'relative'
      }, [
        c('&::after', {
          raw: `
              content: "";
              background-color: transparent;
              position: absolute;
              left: 8px;
              right: 8px;
              top: 0;
              bottom: 0;
              pointer-events: none;
            `,
          borderRadius,
          transition: `background-color .3s ${easeInOutCubicBezier}`
        }),
        cNotM('disabled', [
          c('&:active::after', {
            backgroundColor: itemColorMatch
          })
        ]),
        cM('selected', [
          c('&::after', {
            backgroundColor: itemColorMatch
          }),
          cB('menu-item-content', [
            cE('icon', [
              cB('icon', {
                fill: itemIconColorSelected,
                stroke: itemIconColorSelected
              })
            ]),
            cB('menu-item-content-header', {
              color: itemTextColorSelected
            }, [
              cE('extra', {
                color: itemExtraTextColorSelected
              })
            ])
          ])
        ])
      ]),
      cB('menu-item-content', {
        raw: `
            box-sizing: border-box;
            line-height: 1.75;
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            z-index: auto;
            padding-right: 12px;
            transition:
              background-color .3s ${easeInOutCubicBezier},
              padding-left .3s ${easeInOutCubicBezier},
              border-color .3s ${easeInOutCubicBezier};
          `
      }, [
        cM('disabled', {
          opacity: '.45',
          cursor: 'not-allowed'
        }),
        cM('collapsed', [
          cE('arrow', {
            transition: `
                transform 0.2s ${easeInOutCubicBezier},
                opacity 0.2s ${easeInOutCubicBezier},
                border-color 0.3s ${easeInOutCubicBezier}
              `,
            transform: 'rotate(225deg)'
          })
        ]),
        cM('uncollapsable', {
          cursor: 'default'
        }),
        cM('child-selected', [
          cB('menu-item-content-header', {
            color: itemTextColorChildSelected
          }, [
            cE('extra', {
              color: itemExtraTextColorChildSelected
            })
          ]),
          cE('icon', [
            cB('icon', {
              fill: itemIconColorChildSelected,
              stroke: itemIconColorChildSelected
            })
          ])
        ]),
        cNotM('disabled', [
          cNotM('uncollapsable', [
            hoverStyle(null, [
              cE('icon', [
                cB('icon', {
                  fill: itemIconColorHover,
                  stroke: itemIconColorHover
                })
              ]),
              cB('menu-item-content-header', {
                color: itemTextColorHover
              }, [
                cE('extra', {
                  color: itemExtraTextColorHover
                })
              ])
            ])
          ])
        ]),
        cE('icon', {
          raw: `
              transition:
                font-size .3s ${easeInOutCubicBezier},
                padding-right .3s ${easeInOutCubicBezier};
              box-sizing: content-box;
              flex-shrink: 0;
              padding-right: 8px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            `
        }, [
          cB('icon', {
            fill: itemIconColor,
            stroke: itemIconColor
          })
        ]),
        cE('arrow', {
          raw: `
              content: '';
              height: 6px;
              width: 6px;
              position: absolute;
              right: 24px;
              top: calc(50% - 2px);
              transform: rotate(45deg);
              transform-origin: 25% 25%;
              opacity: 1;
            `,
          borderLeft: `2px solid ${submenuArrowColor}`,
          borderTop: `2px solid ${submenuArrowColor}`,
          transition: `
              transform 0.2s ${easeInOutCubicBezier},
              opacity 0.2s ${easeInOutCubicBezier} .1s,
              border-color 0.3s ${easeInOutCubicBezier}`
        }),
        cB('menu-item-content-header', {
          raw: `
              transition:
                color .3s ${easeInOutCubicBezier},
                opacity .3s ${easeInOutCubicBezier};
              opacity: 1;
              flex-grow: 1;
              flex-shrink: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `,
          color: itemTextColor
        }, [
          cE('extra', {
            raw: `
                white-space: nowrap;
                margin-left: 6px;
                display: inline-block;
                transition: color 0.3s ${easeInOutCubicBezier};
                font-size: 13px;
              `,
            color: itemExtraTextColor
          })
        ])
      ]),
      cB('submenu', {
        cursor: 'pointer',
        position: 'relative',
        marginTop: '6px'
      }, [
        cB('menu-item-content', {
          height: '42px'
        }),
        cB('submenu-children', {
          overflow: 'hidden',
          padding: 0
        }, [
          fadeInHeightExpandTransition({
            duration: '.3s'
          })
        ])
      ]),
      cB('menu-item-group', [
        cB('menu-item-group-title', {
          raw: `
              margin-top: 6px;
              color: ${groupTextColor};
              cursor: default;
              font-size: 13px;
              height: 36px;
              display: flex;
              align-items: center;
              transition:
                padding-left .3s ${easeInOutCubicBezier},
                color .3s ${easeInOutCubicBezier};
            `
        })
      ])
    ])
  }
])

function hoverStyle (props, children) {
  return [
    cM('hover', props, children),
    c('&:hover', props, children)
  ]
}
