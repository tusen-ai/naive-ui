import { c, cB, cTB, cE, cM, cNotM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const type = props.$instance.type
    const pallete = extractPallete(props.$local, type)
    return [
      createRippleAnimation(),
      cTB(
        'button',
        [
          cM(`${type}-type`, {
            '--ripple-color': pallete.rippleColor
          }, [
            // wave animation
            cB('base-wave', [
              cM('active', {
                zIndex: 1,
                animationName: `button-wave-spread, button-wave-opacity`
              })
            ]),
            // background-color
            createBackgroundStyle(pallete),
            // text-color
            ['base', 'ghost', 'text'].map(appearance => createTextStyle(pallete, appearance)),
            cM('base', [
              cM('custom-color', {
                color: `${props.$local.textColorPrimary} !important`
              })
            ]),
            // border-color
            createBorderStyle(pallete)
          ])
        ]
      )
    ]
  }
])

function extractPallete (props, type) {
  return {
    color: props[createKey('color', type)],
    colorHover: props[createKey('color', type, 'hover')],
    colorPressed: props[createKey('color', type, 'pressed')],
    colorFocus: props[createKey('color', type, 'focus')],
    colorDisabled: props[createKey('color', type, 'disabled')],

    textColor: props[createKey('textColor', type)],
    textColorHover: props[createKey('textColor', type, 'hover')],
    textColorPressed: props[createKey('textColor', type, 'pressed')],
    textColorFocus: props[createKey('textColor', type, 'focus')],
    textColorDisabled: props[createKey('textColor', type, 'disabled')],

    textColorText: props[createKey('textColor', type, 'text')],
    textColorTextHover: props[createKey('textColor', type, 'textHover')],
    textColorTextPressed: props[createKey('textColor', type, 'textPressed')],
    textColorTextFocus: props[createKey('textColor', type, 'textFocus')],
    textColorTextDisabled: props[createKey('textColor', type, 'textDisabled')],

    textColorGhost: props[createKey('textColor', type, 'ghost')],
    textColorGhostHover: props[createKey('textColor', type, 'ghostHover')],
    textColorGhostPressed: props[createKey('textColor', type, 'ghostPressed')],
    textColorGhostFocus: props[createKey('textColor', type, 'ghostFocus')],
    textColorGhostDisabled: props[createKey('textColor', type, 'ghostDisabled')],

    borderColor: props[createKey('borderColor', type)],
    borderColorHover: props[createKey('borderColor', type, 'hover')],
    borderColorPressed: props[createKey('borderColor', type, 'pressed')],
    borderColorFocus: props[createKey('borderColor', type, 'focus')],
    borderColorDisabled: props[createKey('borderColor', type, 'disabled')],

    rippleColor: props[createKey('rippleColor', type)],

    iconColor: props[createKey('iconColor', type)]
  }
}

function createRippleAnimation () {
  return [
    c(`@keyframes button-wave-spread`, {
      from: {
        boxShadow: `0 0 0.5px 0 var(--ripple-color)`
      },
      to: {
        // don't use exact 5px since chrome will display the animation with glitches
        boxShadow: `0 0 0.5px 4.5px var(--ripple-color)`
      }
    }),
    c(`@keyframes button-wave-opacity`, {
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

function createTextStyle (pallete, appearance) {
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
    color: `var(--color, ${pallete[propPrefix]})`
  }, [
    cM('disabled', {
      color: `var(--color-disabled, ${pallete[disabledKey]})`
    }),
    cNotM('disabled', [
      c('&:focus', {
        color: `var(--color-focus, ${pallete[focusKey]})`
      }),
      c('&:hover', {
        color: `var(--color-hover, ${pallete[hoverKey]})`
      }),
      c('&:active', {
        color: `var(--color-pressed, ${pallete[pressedKey]})`
      }),
      cM('pressed', {
        color: `var(--color-pressed, ${pallete[pressedKey]})`
      })
    ])
  ])
}

function createBorderStyle (pallete) {
  return [
    cM('ghost, base', {
      borderColor: `var(--color, ${pallete.borderColor})`
    }, [
      cM('disabled', {
        borderColor: `var(--color-disabled, ${pallete.borderColorDisabled})`
      }),
      cNotM('disabled', [
        c('&:focus', {
          borderColor: `var(--color-focus, ${pallete.borderColorFocus})`
        }, [
          createBorderMaskStyle(`var(--color-focus, ${pallete.borderColorFocus})`)
        ]),
        c('&:hover', {
          borderColor: `var(--color-hover, ${pallete.borderColorHover})`
        }, [
          createBorderMaskStyle(`var(--color-hover, ${pallete.borderColorHover})`)
        ]),
        c('&:active', {
          borderColor: `var(--color-pressed, ${pallete.borderColorPressed})`
        }, [
          createBorderMaskStyle(`var(--color-pressed, ${pallete.borderColorPressed})`)
        ]),
        cM('pressed', {
          borderColor: `var(--color-pressed, ${pallete.borderColorPressed})`
        }, [
          createBorderMaskStyle(`var(--color-pressed, ${pallete.borderColorPressed})`)
        ])
      ])
    ]),
    cM('text', {
      border: 'none'
    })
  ]
}

function createBackgroundStyle (pallete) {
  return [
    cM('base', {
      backgroundColor: `var(--color, ${pallete.color})`
    }, [
      cM('disabled', {
        backgroundColor: `var(--color-disabled, ${pallete.colorDisabled})`
      }),
      cNotM('disabled', [
        c('&:focus', {
          backgroundColor: `var(--color-focus, ${pallete.colorFocus})`
        }),
        c('&:hover', {
          backgroundColor: `var(--color-hover, ${pallete.colorHover})`
        }),
        c('&:active', {
          backgroundColor: `var(--color-pressed, ${pallete.colorPressed})`
        }),
        cM('pressed', {
          backgroundColor: `var(--color-pressed, ${pallete.colorPressed})`
        })
      ])
    ]),
    cM('ghost, text', {
      backgroundColor: 'transparent'
    })
  ]
}
