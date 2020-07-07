import { cTB, c, cB, cE, cM, insideFormItem } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      easeInOutCubicBezier
    } = props.$base
    const {
      borderRadius
    } = props.$local
    const {
      disabledButtonBackgroundColor,
      disabledButtonTextColor,
      disabledPlaceholderColor,
      disabledBackgroundColor,
      disabledTextColor,
      textColor,
      borderColor,
      borderHoverColor,
      buttonBackgroundColor,
      hoverButtonBackgroundColor,
      activeButtonBackgroundColor,
      buttonTextColor,
      hoverButtonTextColor,
      activeButtonTextColor,
      caretColor,
      backgroundColor,
      focusBackgroundColor,
      focusBorderMaskBoxShadow,
      hoverBorderMaskBoxShadow,
      placeholdeColor
    } = props.$local.default
    return cTB('input-number', {
      raw: `
        position: relative;
        box-sizing: border-box;
        width: 152px;
        display: inline-block;
        outline: none;
        z-index: auto;
      `,
      borderRadius
    }, [
      cE('border-mask', {
        raw: `
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          box-shadow: inset 0 0 0px 1px transparent;
          border-radius: ${borderRadius};
          transition: box-shadow .3s ${easeInOutCubicBezier};
          pointer-events: none;
        `
      }),
      cE('minus-button', {
        left: 0,
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius
      }, [
        cB('input-number-button-border-mask', {
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius
        }),
        cB('input-number-button-body', {
          left: '1px',
          right: 0
        }, [
          cB('icon', {
            transform: 'translateX(-1px)'
          })
        ]),
        cB('input-number-button-boundary', {
          left: 0
        })
      ]),
      cE('add-button', {
        right: 0,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius
      }, [
        cB('input-number-button-border-mask', {
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius
        }),
        cB('input-number-button-body', {
          right: '1px',
          left: 0
        }, [
          cB('icon', {
            transform: 'translateX(1px)'
          })
        ]),
        cB('input-number-button-boundary', {
          right: 0
        })
      ]),
      cM('disabled', {
        cursor: 'not-allowed'
      }, [
        cE('button', {
          pointerEvents: 'none'
        }, [
          cB('input-number-button-body', {
            backgroundColor: disabledButtonBackgroundColor
          }),
          cB('input-number-button-boundary', {
            backgroundColor: disabledButtonBackgroundColor
          }),
          cB('icon', {
            fill: disabledButtonTextColor,
            stroke: disabledButtonTextColor
          })
        ]),
        cE('input', {
          backgroundColor: disabledBackgroundColor,
          color: disabledTextColor,
          pointerEvents: 'none'
        }, [
          c('&::placeholder', {
            color: disabledPlaceholderColor
          })
        ])
      ]),
      cM('invalid', [
        cE('input', {
          textDecoration: 'line-through',
          textDecorationColor: textColor
        })
      ]),
      cE('button', {
        raw: `
          background-color: transparent;
          overflow: hidden;
          outline: none;
          position: absolute;
          cursor: pointer;
          z-index: auto;
          top: 0;
          padding: 0;
          border: none;
          font-size: 14px;
        `
      }, [
        cB('input-number-button-border-mask', {
          raw: `
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          `,
          transition: `
            box-shadow .3s ${easeInOutCubicBezier}
          `,
          boxShadow: `inset 0 0 0 1px ${borderColor}`
        }),
        cB('input-number-button-body', {
          raw: `
            position: absolute;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          `,
          transition: `
            background-color .3s ${easeInOutCubicBezier}
          `,
          backgroundColor: buttonBackgroundColor
        }),
        cB('input-number-button-boundary', {
          raw: `
            width: 1px;
            position: absolute;
            top: 0;
            bottom: 0;
          `,
          transition: `
            background-color .3s ${easeInOutCubicBezier}
          `,
          backgroundColor: buttonBackgroundColor
        }),
        cB('icon', {
          fill: buttonTextColor,
          stroke: buttonTextColor
        }),
        c('&:hover ~', [
          cE('border-mask', {
            boxShadow: `inset 0 0 0 1px ${borderHoverColor}`
          })
        ]),
        c('&:hover', [
          cB('input-number-button-body', {
            backgroundColor: hoverButtonBackgroundColor
          }),
          cB('input-number-button-boundary', {
            backgroundColor: hoverButtonBackgroundColor
          }),
          cB('icon', {
            stroke: hoverButtonTextColor,
            fill: hoverButtonTextColor
          })
        ]),
        c('&:active', [
          cB('input-number-button-body', {
            backgroundColor: activeButtonBackgroundColor
          }),
          cB('input-number-button-boundary', {
            backgroundColor: activeButtonBackgroundColor
          }),
          cB('icon', {
            stroke: activeButtonTextColor,
            fill: activeButtonTextColor
          })
        ]),
        cM('disabled', {
          cursor: 'not-allowed'
        }, [
          cB('input-number-button-body', {
            backgroundColor: disabledButtonBackgroundColor
          }),
          cB('input-number-button-boundary', {
            backgroundColor: disabledButtonBackgroundColor
          }),
          cB('icon', {
            stroke: disabledButtonTextColor,
            fill: disabledButtonTextColor
          })
        ])
      ]),
      cE('input', {
        raw: `
          outline: none;
          box-sizing: border-box;
          border-radius: ${borderRadius};
          transition:
            color .3s ${easeInOutCubicBezier},
            caret-color .3s ${easeInOutCubicBezier},
            background-color .3s ${easeInOutCubicBezier},
            box-shadow .3s ${easeInOutCubicBezier},
            text-decoration-color .3s ${easeInOutCubicBezier};
          border: none;
          width: 100%;
          text-align: center;
        `,
        backgroundColor,
        boxShadow: `inset 0 0 0 1px ${borderColor}`,
        color: textColor,
        caretColor: caretColor
      }, [
        c('&::placeholder', {
          transition: `color .3s ${easeInOutCubicBezier}`,
          color: placeholdeColor
        }),
        c('&:hover ~', [
          cE('border-mask', {
            boxShadow: hoverBorderMaskBoxShadow
          })
        ]),
        c('&:focus', {
          backgroundColor: focusBackgroundColor
        }, [
          c('& ~', [
            cE('border-mask', {
              boxShadow: focusBorderMaskBoxShadow
            })
          ])
        ])
      ])
    ])
  },
  ({ props }) => ['warning', 'error'].map(status => {
    const pallete = props.$local[status]
    const {
      borderMaskBoxShadow,
      hoverBorderMaskBoxShadow,
      focusBorderMaskBoxShadow,
      focusBackgroundColor,
      caretColor,
      hoverButtonTextColor,
      activeButtonTextColor
    } = pallete
    return insideFormItem(
      status,
      cTB('input-number', [
        cE('border-mask', {
          boxShadow: borderMaskBoxShadow
        }),
        cE('input', {
          caretColor: caretColor
        }, [
          c('&:hover ~', [
            cE('border-mask', {
              boxShadow: hoverBorderMaskBoxShadow
            })
          ]),
          c('&:focus', {
            backgroundColor: focusBackgroundColor
          }, [
            c('& ~', [
              cE('border-mask', {
                boxShadow: focusBorderMaskBoxShadow
              })
            ])
          ])
        ]),
        cE('button', [
          c('&:hover', [
            cB('icon', {
              fill: hoverButtonTextColor,
              stroke: hoverButtonTextColor
            })
          ]),
          c('&:active', [
            cB('icon', {
              fill: activeButtonTextColor,
              stroke: activeButtonTextColor
            })
          ])
        ])
      ])
    )
  })
])
