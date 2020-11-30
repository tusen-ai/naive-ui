import { cTB, c, cB, cE, cM, createKey, insideFormItem } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      cubicBezierEaseInOut
    } = props.$global
    const {
      buttonColorDisabled,
      buttonTextColorDisabled,
      placeholderColorDisabled,
      colorDisabled,
      textColorDisabled,
      textColor,
      border,
      borderHover,
      borderFocus,
      buttonColor,
      buttonColorHover,
      buttonColorActive,
      buttonTextColor,
      buttonTextColorHover,
      buttonTextColorPressed,
      caretColor,
      color: backgroundColor,
      colorFocus,
      boxShadowFocus,
      placeholderColor,
      borderRadius
    } = props.$local
    return cTB('input-number', {
      raw: `
        position: relative;
        box-sizing: border-box;
        display: inline-block;
        outline: none;
        z-index: auto;
      `,
      borderRadius
    }, [
      cE('border', {
        raw: `
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border: ${border};
          border-radius: ${borderRadius};
          transition: border-color .3s ${cubicBezierEaseInOut};
          pointer-events: none;
        `
      }),
      cE('border-mask', {
        raw: `
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border: ${border};
          border-color: transparent;
          border-radius: ${borderRadius};
          transition:
            box-shadow .3s ${cubicBezierEaseInOut},
            border-color .3s ${cubicBezierEaseInOut};
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
            backgroundColor: buttonColorDisabled
          }),
          cB('input-number-button-boundary', {
            backgroundColor: buttonColorDisabled
          }),
          cB('icon', {
            color: buttonTextColorDisabled
          })
        ]),
        cE('input', {
          backgroundColor: colorDisabled,
          color: textColorDisabled,
          pointerEvents: 'none'
        }, [
          c('&::placeholder', {
            color: placeholderColorDisabled
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
            border-color .3s ${cubicBezierEaseInOut},
            box-shadow .3s ${cubicBezierEaseInOut}
          `,
          border
        }),
        cB('input-number-button-body', {
          raw: `
            position: absolute;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color .3s ${cubicBezierEaseInOut};
          `,
          backgroundColor: buttonColor
        }),
        cB('input-number-button-boundary', {
          raw: `
            width: 1px;
            position: absolute;
            top: 0;
            bottom: 0;
            transition: background-color .3s ${cubicBezierEaseInOut};
          `,
          backgroundColor: buttonColor
        }),
        cB('icon', {
          transition: `color .3s ${cubicBezierEaseInOut}`,
          color: buttonTextColor
        }),
        c('&:hover ~', [
          cE('border-mask', {
            border: borderHover
          })
        ]),
        c('&:hover', [
          cB('input-number-button-body', {
            backgroundColor: buttonColorHover
          }),
          cB('input-number-button-boundary', {
            backgroundColor: buttonColorHover
          }),
          cB('icon', {
            color: buttonTextColorHover
          })
        ]),
        c('&:active', [
          cB('input-number-button-body', {
            backgroundColor: buttonColorActive
          }),
          cB('input-number-button-boundary', {
            backgroundColor: buttonColorActive
          }),
          cB('icon', {
            color: buttonTextColorPressed
          })
        ]),
        cM('disabled', {
          cursor: 'not-allowed'
        }, [
          cB('input-number-button-body', {
            backgroundColor: buttonColorDisabled
          }),
          cB('input-number-button-boundary', {
            backgroundColor: buttonColorDisabled
          }),
          cB('icon', {
            color: buttonTextColorDisabled
          })
        ])
      ]),
      cE('input', {
        raw: `
          outline: none;
          box-sizing: border-box;
          border-radius: ${borderRadius};
          transition:
            color .3s ${cubicBezierEaseInOut},
            caret-color .3s ${cubicBezierEaseInOut},
            background-color .3s ${cubicBezierEaseInOut},
            box-shadow .3s ${cubicBezierEaseInOut},
            text-decoration-color .3s ${cubicBezierEaseInOut};
          border: none;
          width: 100%;
          text-align: center;
        `,
        backgroundColor,
        color: textColor,
        caretColor: caretColor
      }, [
        c('&::placeholder', {
          transition: `color .3s ${cubicBezierEaseInOut}`,
          color: placeholderColor
        }),
        c('&:hover ~', [
          cE('border-mask', {
            border: borderHover
          })
        ]),
        c('&:focus', {
          backgroundColor: colorFocus
        }, [
          c('& ~', [
            cE('border-mask', {
              border: borderFocus,
              boxShadow: boxShadowFocus
            })
          ])
        ])
      ])
    ])
  },
  ({ props }) => ['warning', 'error'].map(status => {
    const local = props.$local
    const border = local[createKey('border', status)]
    const borderHover = local[createKey('borderHover', status)]
    const borderFocus = local[createKey('borderFocus', status)]
    const boxShadowFocus = local[createKey('boxShadowFocus', status)]
    const colorFocus = local[createKey('colorFocus', status)]
    const caretColor = local[createKey('caretColor', status)]
    const buttonTextColorHover = local[createKey('buttonTextColorHover', status)]
    const buttonTextColorPressed = local[createKey('buttonTextColorPressed', status)]
    return insideFormItem(
      status,
      cTB('input-number', [
        cE('border-mask', {
          border
        }),
        cE('input', {
          caretColor: caretColor
        }, [
          c('&:hover ~', [
            cE('border-mask', {
              border: borderHover
            })
          ]),
          c('&:focus', {
            backgroundColor: colorFocus
          }, [
            c('& ~', [
              cE('border-mask', {
                border: borderFocus,
                boxShadow: boxShadowFocus
              })
            ])
          ])
        ]),
        cE('button', [
          c('&:hover', [
            cB('icon', {
              color: buttonTextColorHover
            })
          ]),
          c('&:active', [
            cB('icon', {
              color: buttonTextColorPressed
            })
          ])
        ])
      ])
    )
  })
])
