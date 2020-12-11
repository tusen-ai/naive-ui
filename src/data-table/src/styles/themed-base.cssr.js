import { c, cTB, cB, cE, cM, cNotM, insideModal, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { cubicBezierEaseInOut } = props.$global
    const { borderRadius } = props.$local
    const {
      borderColor,
      tdColorHover,
      thColor,
      thColorHover,
      tdColor,
      tdTextColor,
      thTextColor,
      thFontWeight,
      thButtonColorHover,
      thButtonIconColor,
      thButtonIconColorActive,
      fixedColumnBoxShadowColor,
      filterSize
    } = props.$local
    const fixedColumnStyle = createFixedColumnStyle({ cubicBezierEaseInOut, fixedColumnBoxShadowColor })
    return [
      cTB('data-table', {
        width: '100%'
      }, [
        ['small', 'medium', 'large'].map(size => {
          return createSizeStyle(size, props)
        }),
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
            line-height: 1.5;
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
            background-color: ${tdColor}
          `
        }, [
          cB('data-table-thead', {
            transition: `background-color .3s ${cubicBezierEaseInOut}`,
            backgroundColor: thColor
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
              backgroundColor: tdColorHover
            }, [
              cB('data-table-td', {
                backgroundColor: tdColorHover
              })
            ])
          ]),
          cB('data-table-th', {
            position: 'relative',
            textAlign: 'start',
            boxSizing: 'border-box',
            backgroundColor: thColor,
            borderColor: borderColor,
            color: thTextColor,
            transition: `
              border-color .3s ${cubicBezierEaseInOut},
              color .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut};
            `,
            fontWeight: thFontWeight
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
                backgroundColor: thColorHover
              })
            ]),
            fixedColumnStyle
          ]),
          cB('data-table-td', {
            raw: `
              text-align: start;
              box-sizing: border-box;
              border: none;
              background-color: ${tdColor};
              color: ${tdTextColor};
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
              color: thButtonIconColor,
              transition: `
                transform .3s ${cubicBezierEaseInOut},
                color .3s ${cubicBezierEaseInOut}
              `
            }, [
              cM('desc', {
                transform: 'rotate(0)'
              }),
              cM('asc', {
                transform: 'rotate(-180deg)'
              }),
              cM('asc, desc', {
                color: thButtonIconColorActive
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
                  transition: background-color .3s ${cubicBezierEaseInOut};
                `
              }, [
                c('&:hover', {
                  backgroundColor: thButtonColorHover
                }),
                cB('icon', {
                  fontSize: filterSize,
                  fill: thButtonIconColor,
                  stroke: thButtonIconColor
                })
              ]),
              cM('popover-visible', [
                cE('icon-wrapper', {
                  backgroundColor: thButtonColorHover
                })
              ]),
              cM('active', [
                cE('icon-wrapper', {
                  backgroundColor: thButtonColorHover
                }, [
                  cB('icon', {
                    fill: thButtonIconColorActive,
                    stroke: thButtonIconColorActive
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
          margin: '0!important'
        })
      ]),
      createStyleInsideModal(props)
    ]
  }
])

function createStyleInsideModal (props) {
  const {
    tdColorModal,
    thColorModal,
    borderColorModal,
    thColorHoverModal,
    tdColorHoverModal
  } = props.$local
  return insideModal(cTB('data-table', [
    cB('data-table-table', {
      backgroundColor: tdColorModal
    }, [
      cB('data-table-thead', {
        backgroundColor: thColorModal
      }),
      cB('data-table-th', {
        borderColor: borderColorModal,
        backgroundColor: thColorModal
      }, [
        cM('sortable', [
          c('&:hover', {
            backgroundColor: thColorHoverModal
          })
        ])
      ]),
      cB('data-table-tr', [
        c('&:hover', {
          backgroundColor: tdColorHoverModal
        }, [
          cB('data-table-td', {
            backgroundColor: tdColorHoverModal
          })
        ])
      ]),
      cB('data-table-td', {
        borderColor: borderColorModal,
        backgroundColor: tdColorModal
      })
    ]),
    cNotM('single-line', [
      cB('data-table-wrapper', [
        cB('data-table-table', [
          cB('data-table-th', {
            borderRight: `1px solid ${borderColorModal}`
          }, [
            c('&:last-child', {
              borderRight: `0 solid ${borderColorModal}`
            })
          ]),
          cB('data-table-td', {
            borderRight: `1px solid ${borderColorModal}`
          }, [
            c('&:last-child', {
              borderRight: `0 solid ${borderColorModal}`
            })
          ])
        ])
      ])
    ]),
    cM('bordered', [
      cB('data-table-wrapper', {
        border: `1px solid ${borderColorModal}`
      }, [
        cB('data-table-table', [
          cB('data-table-tr', [
            c('&:last-child', [
              cB('data-table-td', {
                borderBottom: `0 solid ${borderColorModal}`
              })
            ])
          ])
        ])
      ])
    ]),
    cB('data-table-base-table-header', [
      cB('data-table-table', {
        borderBottom: `1px solid ${borderColorModal}`
      })
    ])
  ]))
}

function createFixedColumnStyle ({
  cubicBezierEaseInOut
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
        boxShadow: 'inset -12px 0 8px -12px rgba(0, 0, 0, .18)'
      })
    ]),
    cM('shadow-after', [
      c('&::after', {
        boxShadow: 'inset 12px 0 8px -12px rgba(0, 0, 0, .18)'
      })
    ])
  ]
}

function createSizeStyle (size, props) {
  const {
    $local: {
      [createKey('fontSize', size)]: fontSize,
      [createKey('thPadding', size)]: thPadding,
      [createKey('tdPadding', size)]: tdPadding
    }
  } = props
  return cM(`${size}-size`, {
    fontSize: fontSize
  }, [
    cB('data-table-th', {
      padding: thPadding
    }),
    cB('data-table-td', {
      padding: tdPadding
    })
  ])
}
