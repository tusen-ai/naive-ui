import { cTB, c, cB, cE, cM, cNotM, insideFormItem } from '../../../../_utils/cssr'

// TODO split form-item styles out
export default c([
  ({ props }) => {
    const local = props.$local
    const pallete = local.default
    const base = props.$base
    const easeInOutCubicBezier = base.easeInOutCubicBezier
    const borderRadius = local.borderRadius
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
      borderRadius: borderRadius
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
        boxShadow: pallete.borderMaskBoxShadow,
        borderRadius: borderRadius,
        transition: `box-shadow .3s ${easeInOutCubicBezier}`
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
        transition: `color .3s ${easeInOutCubicBezier}`,
        color: pallete.placeholderColor
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
        backgroundColor: pallete.backgroundColor,
        borderRadius: borderRadius,
        boxShadow: pallete.boxShadow,
        transition: `
          color .3s ${easeInOutCubicBezier},
          box-shadow .3s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier}
        `
      }, [
        cB('tag', {
          raw: `
            margin-right: 7px;
            margin-bottom: 3px;
            font-size: 14px;
            max-width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
          `
        })
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
          color .3s ${easeInOutCubicBezier},
          box-shadow .3s ${easeInOutCubicBezier},
          background-color .3s ${easeInOutCubicBezier}
        `,
        borderRadius: borderRadius,
        boxShadow: pallete.boxShadow,
        backgroundColor: pallete.backgroundColor
      }, [
        cE('input', {
          raw: `
            outline: none;
            cursor: pointer;
            box-sizing: border-box;
            text-overflow: ellipsis;
            overflow: hidden;
            border:none;
            width: 100%;
            white-space: nowrap;
            padding: 0 26px 0 14px;
            background-color: transparent;
            height: 100%;
          `,
          color: pallete.textColor,
          transition: `color .3s ${easeInOutCubicBezier}`
        }, [
          c('::placeholder', {
            transition: `color .3s ${easeInOutCubicBezier}`,
            color: pallete.placeholderColor
          }),
          cM('placeholder', {
            color: pallete.placeholderColor
          })
        ])
      ]),
      cNotM('disabled', [
        cM('focus', [
          cB('base-selection-border-mask', {
            boxShadow: pallete.focusBoxShadowBorderMask
          })
        ]),
        cM('active', [
          cB('base-selection-border-mask', {
            boxShadow: pallete.activeBorderMaskBoxShadow
          }),
          cB('base-selection-label', {
            backgroundColor: pallete.activeBackgroundColor
          }),
          cB('base-selection-tags', {
            backgroundColor: pallete.activeBackgroundColor
          }),
          cB('base-selection-input-tag', {
            display: 'inline-block'
          })
        ]),
        cNotM('active', [
          cB('base-selection-label', [
            c('&:focus ~', [
              cB('base-selection-border-mask', {
                boxShadow: pallete.focusBorderMaskBoxShadow
              })
            ]),
            c('&:hover ~', [
              cB('base-selection-border-mask', {
                boxShadow: pallete.hoverBorderMaskBoxShadow
              })
            ])
          ]),
          cB('base-selection-tags', [
            c('&:focus ~', [
              cB('base-selection-border-mask', {
                boxShadow: pallete.focusBorderMaskBoxShadow
              })
            ]),
            c('&:hover ~', [
              cB('base-selection-border-mask', {
                boxShadow: pallete.hoverBorderMaskBoxShadow
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
          backgroundColor: pallete.disabledBackgroundColor,
          boxShadow: pallete.disabledBoxShadow
        }, [
          cE('input', {
            cursor: 'not-allowed',
            color: pallete.disabledTextColor
          }, [
            cM('placeholder', {
              color: pallete.disabledPlaceholderColor
            }),
            c('&::placeholder', {
              color: pallete.disabledPlaceholderColor
            })
          ])
        ]),
        cB('base-selection-tags', {
          cursor: 'now-allowed',
          boxShadow: pallete.disabledBoxShadow,
          backgroundColor: pallete.disabledBackgroundColor
        }),
        cE('placeholder', {
          cursor: 'not-allowed',
          color: pallete.disabledPlaceholderColor
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
            height: 100%;
            width: 1em;
            line-height: inherit;
            cursor: pointer;
          `,
          color: pallete.textColor,
          caretColor: pallete.caretColor
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
    return [
      'warning',
      'error'
    ].map(status => {
      const pallete = props.$local[status]
      return insideFormItem(status, cTB('base-selection', [
        [
          cB('base-selection-border-mask', {
            boxShadow: pallete.borderMaskBoxShadow
          }),
          cNotM('disabled', [
            cM('active', [
              cB('base-selection-border-mask', {
                boxShadow: pallete.activeBorderMaskBoxShadow
              }),
              cB('base-selection-label', {
                backgroundColor: pallete.activeBackgroundColor
              }),
              cB('base-selection-tags', {
                backgroundColor: pallete.activeBackgroundColor
              })
            ]),
            cNotM('active', [
              cB('base-selection-label', [
                c('&:hover ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: pallete.hoverBorderMaskBoxShadow
                  })
                ]),
                c('&:focus ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: pallete.focusBorderMaskBoxShadow
                  })
                ])
              ]),
              cB('base-selection-tags', [
                c('&:hover ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: pallete.hoverBorderMaskBoxShadow
                  })
                ]),
                c('&:focus ~', [
                  cB('base-selection-border-mask', {
                    boxShadow: pallete.focusBorderMaskBoxShadow
                  })
                ])
              ]),
              cM('focus', [
                cB('base-selection-border-mask', {
                  boxShadow: pallete.focusBorderMaskBoxShadow
                })
              ])
            ])
          ])
        ]
      ]))
    })
  }
])
