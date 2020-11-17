import { cTB, c, cB, cE, cM, cNotM, createKey, insideFormItem } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { $local } = props
    const {
      borderRadius,
      color,
      placeholderColor,
      borderColor,
      textColor,
      paddingSingle,
      boxShadowFocus,
      boxShadowActive,
      boxShadowHover,
      colorActive,
      caretColor,
      colorDisabled,
      textColorDisabled,
      placeholderColorDisabled
    } = $local
    const {
      cubicBezierEaseInOut
    } = props.$base
    return cTB('base-selection', {
      raw: `
        position: relative;
        z-index: auto;
        box-shadow: none;
        width: 100%;
        max-width: 100%;
        display: inline-block;
        vertical-align: bottom;
      `,
      borderRadius
    }, [
      cB('base-selection-border-mask', {
        raw: `
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        `,
        boxShadow: 'inset 0 0 0 1px transparent',
        borderRadius,
        transition: `box-shadow .3s ${cubicBezierEaseInOut}`
      }),
      cE('mark', {
        raw: `
          cursor: pointer;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 10px;
        `
      }),
      cM('selected', [
        cE('placeholder', {
          opacity: 0
        })
      ]),
      cE('placeholder', {
        raw: `
          pointer-events: none;
          position: absolute;
          left: 14px;
          top: 0;
          opacity: 1;
        `,
        transition: `color .3s ${cubicBezierEaseInOut}`,
        color: placeholderColor
      }),
      cB('base-selection-tags', {
        raw: `
          cursor: pointer;
          outline: none;
          box-sizing: border-box;
          position: relative;
          z-index: auto;
          display: flex;
          padding: 3px 26px 0 14px;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          vertical-align: bottom;
        `,
        backgroundColor: color,
        borderRadius,
        boxShadow: `inset 0 0 0 1px ${borderColor}`,
        transition: `
          color .3s ${cubicBezierEaseInOut},
          box-shadow .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut}
        `
      }, [
        cB('tag', {
          raw: `
            margin-right: 7px;
            margin-bottom: 3px;
            font-size: 14px;
            max-width: 100%;
          `
        }, [
          cE('content', {
            raw: `
              text-overflow: ellipsis;
              overflow: hidden;`
          })
        ])
      ]),
      cB('base-selection-label', {
        raw: `
          display: inline-block;
          width: 100%;
          vertical-align: bottom;
          cursor: pointer;
          outline: none;
          z-index: auto;
          box-sizing: border-box;
          position: relative;
        `,
        transition: `
          color .3s ${cubicBezierEaseInOut},
          box-shadow .3s ${cubicBezierEaseInOut},
          background-color .3s ${cubicBezierEaseInOut}
        `,
        borderRadius: borderRadius,
        boxShadow: `inset 0 0 0 1px ${borderColor}`,
        backgroundColor: color
      }, [
        cE('input', {
          raw: `
            line-height: inherit;
            outline: none;
            cursor: pointer;
            box-sizing: border-box;
            text-overflow: ellipsis;
            overflow: hidden;
            border:none;
            width: 100%;
            white-space: nowrap;
            padding: ${paddingSingle};
            background-color: transparent;
          `,
          color: textColor,
          transition: `color .3s ${cubicBezierEaseInOut}`
        }),
        cE('placeholder', {
          lineHeight: 'inherit',
          pointerEvents: 'none',
          position: 'absolute',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          padding: '0 26px 0 14px',
          color: placeholderColor,
          transition: `color .3s ${cubicBezierEaseInOut}`
        })
      ]),
      cNotM('disabled', [
        cM('focus', [
          cB('base-selection-border-mask', {
            boxShadow: boxShadowFocus
          })
        ]),
        cM('active', [
          cB('base-selection-border-mask', {
            boxShadow: boxShadowActive
          }),
          cB('base-selection-label', {
            backgroundColor: colorActive
          }),
          cB('base-selection-tags', {
            backgroundColor: colorActive
          }),
          cB('base-selection-input-tag', {
            display: 'inline-block'
          })
        ]),
        cNotM('active', [
          cB('base-selection-label', [
            c('&:focus ~', [
              cB('base-selection-border-mask', {
                boxShadow: boxShadowFocus
              })
            ]),
            c('&:hover ~', [
              cB('base-selection-border-mask', {
                boxShadow: boxShadowHover
              })
            ])
          ]),
          cB('base-selection-tags', [
            c('&:focus ~', [
              cB('base-selection-border-mask', {
                boxShadow: boxShadowFocus
              })
            ]),
            c('&:hover ~', [
              cB('base-selection-border-mask', {
                boxShadow: boxShadowHover
              })
            ])
          ])
        ])
      ]),
      cM('disabled', {
        cursor: 'not-allowed'
      }, [
        cB('base-selection-label', {
          cursor: 'not-allowed',
          backgroundColor: colorDisabled
        }, [
          cE('input', {
            cursor: 'not-allowed',
            color: textColorDisabled
          }, [
            cM('placeholder', {
              color: placeholderColorDisabled
            }),
            c('&::placeholder', {
              color: placeholderColorDisabled
            })
          ])
        ]),
        cB('base-selection-tags', {
          cursor: 'now-allowed',
          backgroundColor: colorDisabled
        }),
        cE('placeholder', {
          cursor: 'not-allowed',
          color: placeholderColorDisabled
        })
      ]),
      cB('base-selection-input-tag', {
        raw: `
          outline: none;
          display: none;
          position: relative;
          margin-bottom: 3px;
          max-width: 100%;
          vertical-align: bottom;
        `
      }, [
        cE('input', {
          raw: `
            padding: 0;
            background-color: transparent;
            outline: none;
            border: none;
            max-width: 100%;
            overflow: hidden;
            width: 1em;
            line-height: inherit;
            cursor: pointer;
          `,
          color: textColor,
          caretColor
        }),
        cE('mirror', {
          raw: `
            position: absolute;
            padding-right: 1em;
            left: 0;
            top: 0;
            white-space: pre;
            visibility: hidden;
            user-select: none;
            opacity: 0;
          `
        })
      ])
    ])
  },
  ({ props }) => {
    const { $local } = props
    return [
      'warning',
      'error'
    ].map(status => {
      return insideFormItem(status, cTB('base-selection', [
        [
          cB('base-selection-border-mask', {
            boxShadow: `inset 0 0 0 1px ${$local[createKey('borderColor', status)]}`
          }),
          cNotM('disabled', [
            cM('active', [
              cB('base-selection-border-mask', {
                boxShadow: $local[createKey('boxShadowActive', status)]
              }),
              cB('base-selection-label', {
                backgroundColor: $local[createKey('colorActive', status)]
              }),
              cB('base-selection-tags', {
                backgroundColor: $local[createKey('boxShadowActive', status)]
              })
            ]),
            cNotM('active', [
              cB('base-selection-label', [
                c('&:hover ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: $local[createKey('boxShadowHover', status)]
                  })
                ]),
                c('&:focus ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: $local[createKey('boxShadowFocus', status)]
                  })
                ])
              ]),
              cB('base-selection-tags', [
                c('&:hover ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: $local[createKey('boxShadowHover', status)]
                  })
                ]),
                c('&:focus ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: $local[createKey('boxShadowFocus', status)]
                  })
                ])
              ]),
              cM('focus', [
                cB('base-selection-border-mask', {
                  boxShadow: $local[createKey('boxShadowFocus', status)]
                })
              ])
            ])
          ])
        ]
      ]))
    })
  }
])
