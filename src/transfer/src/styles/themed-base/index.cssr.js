import { c, cTB, cB, cE, cM } from '../../../../_utils/cssr'
import fadeInTransition from '../../../../styles/_transitions/fade-in'
import animationStyle from './animation.cssr.js'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier,
      easeInCubicBezier,
      easeOutCubicBezier,
      strongFontWeight
    } = props.$base
    const {
      borderRadius,
      borderColor,
      listBackgroundColor,
      headerBackgroundColor,
      headerTextColor,
      disabledHeaderTextColor,
      headerExtraTextColor,
      buttonBackgroundColor,
      buttonHoverBackgroundColor,
      buttonActiveBackgroundColor,
      buttonDisabledBackgroundColor,
      filterBorderColor,
      itemTextColor,
      itemDisabledTextColor
    } = props.$local
    return [
      animationStyle,
      cTB('transfer', {
        display: 'flex',
        width: '444px'
      }, [
        cB('transfer-list', {
          backgroundClip: 'padding-box',
          width: 'calc(50% - 36px)',
          position: 'relative',
          transition: `background-color .3s ${easeInOutCubicBezier}`,
          borderRadius,
          backgroundColor: listBackgroundColor
        }, [
          cB('virtual-scroller', {
            height: '100%',
            scrollbarWidth: 'none',
            '-moz-scrollbar-width': 'none'
          }, [
            c('&::-webkit-scrollbar', {
              width: 0,
              height: 0
            })
          ]),
          cE('border-mask', {
            border: `1px solid ${borderColor}`,
            transition: `transition: border-color .3s ${easeInOutCubicBezier}`,
            pointerEvents: 'none',
            borderRadius,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }),
          cB('transfer-list-header', {
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            backgroundClip: 'padding-box',
            borderRadius,
            backgroundColor: headerBackgroundColor,
            transition: `
              border-color .3s ${easeInOutCubicBezier},
              background-color .3s ${easeInOutCubicBezier}
            `
          }, [
            cE('checkbox', {
              position: 'relative',
              padding: '0 9px 0 14px'
            }, [
              cB('checkbox', {
                display: 'block'
              })
            ]),
            cE('header', {
              flex: 1,
              lineHeight: 1,
              fontWeight: strongFontWeight,
              transition: `color .3s ${easeInOutCubicBezier}`,
              color: headerTextColor
            }, [
              cM('disabled', {
                color: disabledHeaderTextColor
              })
            ]),
            cE('extra', {
              transition: `color .3s ${easeInOutCubicBezier}`,
              fontSize: '12px',
              justifySelf: 'flex-end',
              marginRight: '14px',
              whiteSpace: 'nowrap',
              color: headerExtraTextColor
            })
          ]),
          cB('transfer-list-body', {
            raw: `
              box-sizing: border-box;
              overflow: hidden;
              position: relative;
              height: 272px;
              display: flex;
              flex-direction: column;
            `,
            borderBottomRightRadius: borderRadius,
            borderBottomLeftRadius: borderRadius
          }, [
            cB('transfer-filter', {
              padding: '8px 8px',
              boxSizing: 'border-box',
              transition: `border-color .3s ${easeInOutCubicBezier}`,
              borderBottom: `1px solid ${filterBorderColor}`
            }),
            cB('transfer-list-flex-container', {
              flex: 1,
              position: 'relative'
            }, [
              cB('scrollbar', {
                raw: `
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  height: unset;
                `
              }, [
                cB('scrollbar-content', {
                  width: '100%'
                })
              ]),
              cB('empty', {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateY(-50%) translateX(-50%)'
              }, [
                fadeInTransition()
              ]),
              cB('transfer-list-content', {
                padding: 0,
                margin: 0,
                position: 'relative'
              }, [
                cM('transition-disabled', [
                  cB('transfer-list-item', {
                    animation: 'none !important'
                  })
                ]),
                cB('transfer-list-item', {
                  transition: `color .3s ${easeInOutCubicBezier}`,
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: itemTextColor
                }, [
                  cE('extra', {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingRight: '4px'
                  }),
                  cE('checkbox', {
                    position: 'relative',
                    padding: '0 9px 0 14px'
                  }, [
                    cB('checkbox', {
                      display: 'block'
                    })
                  ]),
                  cM('disabled', {
                    cursor: 'not-allowed',
                    color: itemDisabledTextColor
                  }),
                  cM('source', {
                    animationFillMode: 'forwards'
                  }, [
                    cM('enter', {
                      raw: `
                        transform: translateX(150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${easeInOutCubicBezier}, ${easeOutCubicBezier};
                        animation-delay: 0s, .25s;
                      `
                    }),
                    cM('leave', {
                      raw: `
                        transform: translateX(-150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${easeInOutCubicBezier}, ${easeInCubicBezier};
                        animation-delay: .25s, 0s;
                      `
                    })
                  ]),
                  cM('target', {
                    animationFillMode: 'forwards'
                  }, [
                    cM('enter', {
                      raw: `
                        transform: translateX(-150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${easeInOutCubicBezier}, ${easeOutCubicBezier};
                        animation-delay: 0s, .25s;
                      `
                    }),
                    cM('leave', {
                      raw: `
                        transform: translateX(150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${easeInOutCubicBezier}, ${easeInCubicBezier};
                        animation-delay: .25s, 0s;
                      `
                    })
                  ])
                ])
              ])
            ])
          ])
        ]),
        cB('transfer-gap', {
          width: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }),
        cB('transfer-button', {
          width: '36px',
          height: '36px',
          borderRadius: '18px',
          cursor: 'pointer'
        }, [
          c('&:first-child', {
            marginBottom: '12px'
          }),
          cM('to', {
            transform: 'rotate(180deg)'
          }),
          cE('icon', {
            pointerEvents: 'none',
            transition: `fill .3s ${easeInOutCubicBezier}`,
            fill: buttonBackgroundColor
          }),
          c('&:hover', [
            cE('icon', {
              fill: buttonHoverBackgroundColor
            })
          ]),
          c('&:active', [
            cE('icon', {
              fill: buttonActiveBackgroundColor
            })
          ]),
          cM('disabled', {
            cursor: 'not-allowed'
          }, [
            cE('icon', {
              fill: buttonDisabledBackgroundColor
            })
          ])
        ])
      ])
    ]
  }
])
