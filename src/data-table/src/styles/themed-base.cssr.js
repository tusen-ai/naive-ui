import { c, cTB, cB, cE, cM, cNotM, insideModal } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$base
    const { borderRadius } = props.$local
    const {
      borderColor,
      bodyColorHover,
      headerColor,
      headerColorHover,
      bodyColor,
      bodyTextColor,
      headerTextColor,
      headerFontWeight,
      headerButtonColorHover,
      headerButtonIconColor,
      headerButtonIconColorActive,
      fixedColumnBoxShadowColor
    } = props.$local.default
    const fixedColumnStyle = createFixedColumnStyle({ cubicBezierEaseInOut, fixedColumnBoxShadowColor })
    return [
      createSizeStyle(props),
      cTB('data-table', {
        width: '100%'
      }, [
        cB('data-table-empty', {
          raw: `
            margin: 16px 0 14px 0;
            flex-grow: 1;
            flex-shrink: 0;
            opacity: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity .3s ${cubicBezierEaseInOut};
          `
        }, [
          cM('hide', {
            opacity: 0
          })
        ]),
        cE('pagination', {
          raw: `
            margin-top: 12px;
            display: flex;
            justify-content: flex-end;
          `
        }),
        cB('data-table-wrapper', {
          raw: `
            position: relative;
            transition: border-color .3s ${cubicBezierEaseInOut};
            border-top-left-radius: ${borderRadius};
            border-top-right-radius: ${borderRadius};
            overflow: hidden;
            line-height: 1.75;
          `
        }),
        cM('single-column', [
          cB('data-table-wrapper', [
            cB('data-table-table', [
              cB('data-table-tr', [
                cB('data-table-td', {
                  borderBottom: `0 solid ${borderColor}`
                }, [
                  c('&::after, &::before', {
                    bottom: '0 !important'
                  })
                ])
              ])
            ])
          ])
        ]),
        cNotM('single-line', [
          cB('data-table-wrapper', [
            cB('data-table-table', [
              cB('data-table-th', {
                borderRight: `1px solid ${borderColor}`
              }, [
                cB('&:last-child', {
                  borderRight: `0 solid ${borderColor}`
                })
              ]),
              cB('data-table-td', {
                borderRight: `1px solid ${borderColor}`
              }, [
                cB('&:last-child', {
                  borderRight: `0 solid ${borderColor}`
                })
              ])
            ])
          ])
        ]),
        cM('bordered', [
          cB('data-table-wrapper', {
            overflow: 'hidden',
            border: `1px solid ${borderColor}`,
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius
          }, [
            cB('data-table-table', [
              cB('data-table-tr', [
                c('&:last-child', [
                  cB('data-table-td', {
                    borderBottom: `0 solid ${borderColor}`
                  })
                ])
              ])
            ])
          ])
        ]),
        cB('data-table-base-table', [
          cB('scrollbar', [
            cB('scrollbar-content', {
              overflow: 'visible'
            })
          ])
        ]),
        cB('data-table-table', {
          raw: `
            font-variant-numeric: tabular-nums;
            width: 100%;
            word-wrap: break-word;
            word-break: break-all;
            table-layout: fixed;
            transition: background-color .3s ${cubicBezierEaseInOut};
            border-collapse: separate;
            border-spacing: 0;
            background-color: ${bodyColor}
          `
        }, [
          cB('data-table-thead', {
            transition: `background-color .3s ${cubicBezierEaseInOut}`,
            backgroundColor: headerColor
          }),
          cB('data-table-tr', {
            boxSizing: 'border-box',
            backgroundClip: 'padding-box',
            transition: `background-color .3s ${cubicBezierEaseInOut}`
          }, [
            c('&:last-child', [
              cB('data-table-td', [
                c('&::after', {
                  bottom: '0 !important'
                }),
                c('&::before', {
                  bottom: '0 !important'
                })
              ])
            ]),
            c('&:hover', {
              backgroundColor: bodyColorHover
            }, [
              cB('data-table-td', {
                backgroundColor: bodyColorHover
              })
            ])
          ]),
          cB('data-table-th', {
            position: 'relative',
            textAlign: 'start',
            fontWeight: headerFontWeight,
            boxSizing: 'border-box',
            backgroundColor: headerColor,
            borderColor: borderColor,
            color: headerTextColor,
            transition: `
              border-color .3s ${cubicBezierEaseInOut},
              color .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut};
            `
          }, [
            cM('filterable', {
              paddingRight: '36px'
            }),
            cM('selection', {
              lineHeight: 0
            }),
            cM('ellipsis', {
              raw: `
                display: inline-block;
                vertical-align: middle;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                max-width: 100%;
              `
            }),
            cM('sortable', {
              cursor: 'pointer'
            }, [
              cE('ellipsis', {
                maxWidth: 'calc(100% - 18px)'
              }),
              c('&:hover', {
                backgroundColor: headerColorHover
              })
            ]),
            fixedColumnStyle
          ]),
          cB('data-table-td', {
            raw: `
              text-align: start;
              box-sizing: border-box;
              border: none;
              background-color: ${bodyColor};
              color: ${bodyTextColor};
              border-bottom: 1px solid ${borderColor};
              transition:
                box-shadow .3s ${cubicBezierEaseInOut},
                background-color .3s ${cubicBezierEaseInOut},
                border-color .3s ${cubicBezierEaseInOut},
                color .3s ${cubicBezierEaseInOut};
            `
          }, [
            cM('ellipsis', {
              raw: `
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              `
            }),
            cM('selection', {
              lineHeight: 0
            }),
            fixedColumnStyle
          ])
        ]),
        cB('data-table-base-table-header', {
          flexShrink: 0,
          transition: `border-color .3s ${cubicBezierEaseInOut}`,
          scrollbarWidth: 'none'
        }, [
          c('&::-webkit-scrollbar', {
            width: 0,
            height: 0
          }),
          cB('data-table-table', {
            borderBottom: `1px solid ${borderColor}`,
            transition: `border-color .3s ${cubicBezierEaseInOut}`
          }),
          cB('data-table-th', [
            cB('data-table-sort-button', {
              height: '14px',
              width: '14px',
              marginLeft: '4px',
              position: 'relative',
              display: 'inline-flex',
              verticalAlign: '-0.2em',
              color: headerButtonIconColor,
              transition: `transform .3s ${cubicBezierEaseInOut}`
            }, [
              cM('desc', {
                transform: 'rotate(0)'
              }),
              cM('asc', {
                transform: 'rotate(-180deg)'
              }),
              cM('asc, desc', {
                color: headerButtonIconColorActive
              })
            ]),
            cB('data-table-filter-button', {
              raw: `
                position: absolute;
                z-index: auto;
                right: 0;
                width: 36px;
                top: 0;
                bottom: 0;
                cursor: pointer;
              `
            }, [
              cE('icon-wrapper', {
                raw: `
                  position: absolute;
                  z-index: auto;
                  right: 0;
                  left: 0;
                  top: 0;
                  bottom: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;  
                `,
                transition: `background-color .3s ${cubicBezierEaseInOut}`
              }, [
                c('&:hover', {
                  backgroundColor: headerButtonColorHover
                }),
                cB('icon', {
                  fontSize: '15px',
                  color: headerButtonIconColor
                })
              ]),
              cM('popover-visible', [
                cE('icon-wrapper', {
                  backgroundColor: headerButtonColorHover
                })
              ]),
              cM('active', [
                cE('icon-wrapper', {
                  backgroundColor: headerButtonColorHover
                }, [
                  cB('icon', {
                    color: headerButtonIconColorActive
                  })
                ])
              ])
            ])
          ])
        ])
      ]),
      cB('data-table-filter-menu', [
        cB('scrollbar', {
          maxHeight: '240px'
        }),
        cE('group', {
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 12px 0 12px'
        }, [
          cB('checkbox', {
            marginBottom: '12px',
            marginRight: 0
          }),
          cB('radio', {
            marginBottom: '12px',
            marginRight: 0
          })
        ]),
        cE('action', {
          padding: '8px 12px',
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-evenly'
        }, [
          cB('button', [
            c('&:not(:last-child)', {
              marginRight: '8px'
            })
          ])
        ]),
        cB('divider', {
          margin: '0 !important'
        })
      ]),
      createStyleInsideModal(props)
    ]
  }
])

function createStyleInsideModal (props) {
  const {
    bodyColor,
    headerColor,
    borderColor,
    headerColorHover,
    bodyColorHover
  } = props.$local.modal
  return insideModal(cTB('data-table', [
    cB('data-table-table', {
      backgroundColor: bodyColor
    }, [
      cB('data-table-thead', {
        backgroundColor: headerColor
      }),
      cB('data-table-th', {
        borderColor: borderColor,
        backgroundColor: headerColor
      }, [
        cM('sortable', [
          c('&:hover', {
            backgroundColor: headerColorHover
          })
        ])
      ]),
      cB('data-table-tr', [
        c('&:hover', {
          backgroundColor: bodyColorHover
        }, [
          cB('data-table-td', {
            backgroundColor: bodyColorHover
          })
        ])
      ]),
      cB('data-table-td', {
        borderColor: borderColor,
        backgroundColor: bodyColor
      })
    ]),
    cNotM('single-line', [
      cB('data-table-wrapper', [
        cB('data-table-table', [
          cB('data-table-th', {
            borderRight: `1px solid ${borderColor}`
          }, [
            c('&:last-child', {
              borderRight: `0 solid ${borderColor}`
            })
          ]),
          cB('data-table-td', {
            borderRight: `1px solid ${borderColor}`
          }, [
            c('&:last-child', {
              borderRight: `0 solid ${borderColor}`
            })
          ])
        ])
      ])
    ]),
    cM('bordered', [
      cB('data-table-wrapper', {
        border: `1px solid ${borderColor}`
      }, [
        cB('data-table-table', [
          cB('data-table-tr', [
            c('&:last-child', [
              cB('data-table-td', {
                borderBottom: `0 solid ${borderColor}`
              })
            ])
          ])
        ])
      ])
    ]),
    cB('data-table-base-table-header', [
      cB('data-table-table', {
        borderBottom: `1px solid ${borderColor}`
      })
    ])
  ]))
}

function createSizeStyle (props) {
  const {
    smallFontSize,
    mediumFontSize,
    largeFontSize
  } = props.$local
  return cTB('data-table', [
    cM('small-size', {
      fontSize: smallFontSize
    }, [
      cB('data-table-th', {
        padding: '5px 5px 5px 11px'
      }),
      cB('data-table-td', {
        padding: '5px 5px 5px 11px'
      })
    ]),
    cM('medium-size', {
      fontSize: mediumFontSize
    }, [
      cB('data-table-th', {
        padding: '10px 10px 10px 16px'
      }),
      cB('data-table-td', {
        padding: '10px 10px 10px 16px'
      })
    ]),
    cM('large-size', {
      fontSize: largeFontSize
    }, [
      cB('data-table-th', {
        padding: '15px 15px 15px 20px'
      }),
      cB('data-table-td', {
        padding: '15px 15px 15px 20px'
      })
    ])
  ])
}

function createFixedColumnStyle ({
  cubicBezierEaseInOut,
  fixedColumnBoxShadowColor
}) {
  return [
    cM('fixed-left', {
      left: 0,
      position: 'sticky',
      zIndex: 2
    }, [
      c('&::after', {
        raw: `
          pointer-events: none;
          content: "";
          width: 36px;
          display: inline-block;
          position: absolute;
          top: 0;
          bottom: -1px;
          transition: box-shadow .2s ${cubicBezierEaseInOut};
          right: -36px;
        `
      })
    ]),
    cM('fixed-right', {
      right: 0,
      position: 'sticky',
      zIndex: 1
    }, [
      c('&::before', {
        raw: `
          pointer-events: none;
          content: "";
          width: 36px;
          display: inline-block;
          position: absolute;
          top: 0;
          bottom: -1px;
          transition: box-shadow .2s ${cubicBezierEaseInOut};
          left: -36px;
        `
      })
    ]),
    cM('shadow-before', [
      c('&::before', {
        boxShadow: `inset -12px 0 8px -12px ${fixedColumnBoxShadowColor}`
      })
    ]),
    cM('shadow-after', [
      c('&::after', {
        boxShadow: `inset 12px 0 8px -12px ${fixedColumnBoxShadowColor}`
      })
    ])
  ]
}
