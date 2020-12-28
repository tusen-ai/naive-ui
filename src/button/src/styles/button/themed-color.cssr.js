import { c, cB, cTB, cE, cM, cNotM, createKey } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const type = props.$vm.type
    const palette = extractPalette(props.$local, type)
    return [
      createRippleAnimation(),
      cTB(
        'button',
        [
          cM(`${type}-type`, {
            '--ripple-color': palette.rippleColor
          }, [
            // wave animation
            cB('base-wave', [
              cM('active', {
                zIndex: 1,
                animationName: 'button-wave-spread, button-wave-opacity'
              })
            ]),
            // background-color
            createBackgroundStyle(palette),
            // text-color
            ['base', 'ghost', 'text'].map(appearance => createTextStyle(palette, appearance)),
            cM('base', [
              cM('custom-color', {
                color: `${props.$local.textColorPrimary} !important`
              })
            ]),
            // border-color
            createBorderStyle(palette)
          ])
        ]
      )
    ]
  }
])

function extractPalette (props, type) {
  return {
    color: props[createKey('color', type)],
    colorHover: props[createKey('colorHover', type)],
    colorPressed: props[createKey('colorPressed', type)],
    colorFocus: props[createKey('colorFocus', type)],
    colorDisabled: props[createKey('colorDisabled', type)],

    textColor: props[createKey('textColor', type)],
    textColorHover: props[createKey('textColorHover', type)],
    textColorPressed: props[createKey('textColorPressed', type)],
    textColorFocus: props[createKey('textColorFocus', type)],
    textColorDisabled: props[createKey('textColorDisabled', type)],

    textColorText: props[createKey('textColorText', type)],
    textColorTextHover: props[createKey('textColorTextHover', type)],
    textColorTextPressed: props[createKey('textColorTextPressed', type)],
    textColorTextFocus: props[createKey('textColorTextFocus', type)],
    textColorTextDisabled: props[createKey('textColorTextDisabled', type)],

    textColorGhost: props[createKey('textColorGhost', type)],
    textColorGhostHover: props[createKey('textColorGhostHover', type)],
    textColorGhostPressed: props[createKey('textColorGhostPressed', type)],
    textColorGhostFocus: props[createKey('textColorGhostFocus', type)],
    textColorGhostDisabled: props[createKey('textColorGhostDisabled', type)],

    borderColor: props[createKey('borderColor', type)],
    borderColorHover: props[createKey('borderColorHover', type)],
    borderColorPressed: props[createKey('borderColorPressed', type)],
    borderColorFocus: props[createKey('borderColorFocus', type)],
    borderColorDisabled: props[createKey('borderColorDisabled', type)],

    rippleColor: props[createKey('rippleColor', type)],

    iconColor: props[createKey('iconColor', type)]
  }
}

function createRippleAnimation () {
  return [
    c('@keyframes button-wave-spread', {
      from: {
        boxShadow: '0 0 0.5px 0 var(--ripple-color)'
      },
      to: {
        // don't use exact 5px since chrome will display the animation with glitches
        boxShadow: '0 0 0.5px 4.5px var(--ripple-color)'
      }
    }),
    c('@keyframes button-wave-opacity', {
      from: {
        opacity: 0.6
      },
      to: {
        opacity: 0
      }
    })
  ]
}

function createBorderMaskStyle (color) {
  return cE('border-mask', {
    borderColor: color
  })
}

function createTextStyle (palette, appearance) {
  // textColor for base
  // textColorGhost for ghost
  // textColorText for text
  const propPrefix = 'textColor' + ({
    base: '',
    ghost: 'Ghost',
    text: 'Text'
  }[appearance])
  const disabledKey = createKey(propPrefix, 'disabled')
  const focusKey = createKey(propPrefix, 'focus')
  const hoverKey = createKey(propPrefix, 'hover')
  const pressedKey = createKey(propPrefix, 'pressed')
  return cM(appearance, {
    color: `var(--color, ${palette[propPrefix]})`
  }, [
    cM('disabled', {
      color: `var(--color-disabled, ${palette[disabledKey]})`
    }),
    cNotM('disabled', [
      c('&:focus', {
        color: `var(--color-focus, ${palette[focusKey]})`
      }),
      c('&:hover', {
        color: `var(--color-hover, ${palette[hoverKey]})`
      }),
      c('&:active', {
        color: `var(--color-pressed, ${palette[pressedKey]})`
      }),
      cM('pressed', {
        color: `var(--color-pressed, ${palette[pressedKey]})`
      })
    ])
  ])
}

function createBorderStyle (palette) {
  return [
    cM('ghost, base', {
      borderColor: `var(--color, ${palette.borderColor})`
    }, [
      cM('disabled', {
        borderColor: `var(--color-disabled, ${palette.borderColorDisabled})`
      }),
      cNotM('disabled', [
        c('&:focus', {
          borderColor: `var(--color-focus, ${palette.borderColorFocus})`
        }, [
          createBorderMaskStyle(`var(--color-focus, ${palette.borderColorFocus})`)
        ]),
        c('&:hover', {
          borderColor: `var(--color-hover, ${palette.borderColorHover})`
        }, [
          createBorderMaskStyle(`var(--color-hover, ${palette.borderColorHover})`)
        ]),
        c('&:active', {
          borderColor: `var(--color-pressed, ${palette.borderColorPressed})`
        }, [
          createBorderMaskStyle(`var(--color-pressed, ${palette.borderColorPressed})`)
        ]),
        cM('pressed', {
          borderColor: `var(--color-pressed, ${palette.borderColorPressed})`
        }, [
          createBorderMaskStyle(`var(--color-pressed, ${palette.borderColorPressed})`)
        ])
      ])
    ]),
    cM('text', {
      border: 'none'
    })
  ]
}

function createBackgroundStyle (palette) {
  return [
    cM('base', {
      backgroundColor: `var(--color, ${palette.color})`
    }, [
      cM('disabled', {
        backgroundColor: `var(--color-disabled, ${palette.colorDisabled})`
      }),
      cNotM('disabled', [
        c('&:focus', {
          backgroundColor: `var(--color-focus, ${palette.colorFocus})`
        }),
        c('&:hover', {
          backgroundColor: `var(--color-hover, ${palette.colorHover})`
        }),
        c('&:active', {
          backgroundColor: `var(--color-pressed, ${palette.colorPressed})`
        }),
        cM('pressed', {
          backgroundColor: `var(--color-pressed, ${palette.colorPressed})`
        })
      ])
    ]),
    cM('ghost, text', {
      backgroundColor: 'transparent'
    })
  ]
}
