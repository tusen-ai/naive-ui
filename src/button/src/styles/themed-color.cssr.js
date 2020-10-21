import { c, cB, cTB, cE, cM, cNotM, createKey } from '../../../_utils/cssr'
import { read, createHoverColor, createPressedColor } from '../../../_utils/color'

export default c([
  ({ props }) => {
    const digest = props.colorDigest || props.$instance.type
    const pallete = props.colorDigest ? createPallete(props.color) : extractPallete(props.$local, digest)
    return [
      createRippleAnimation(),
      cTB(
        'button',
        [
          cM(`${digest}-colored`, {
            '--ripple-color': pallete.rippleColor || pallete.borderColor || pallete.color
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
            // border-color
            createBorderStyle(pallete)
          ])
        ]
      )
    ]
  }
])

function createPallete (color) {
  const rgb = read(color)
  const colorHover = createHoverColor(rgb)
  const colorPressed = createPressedColor(rgb)
  const colorFocus = colorHover
  return {
    color,
    colorHover,
    colorPressed,
    colorFocus,
    colorDisabled: color
  }
}

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
  const propPrefix = 'textColor' + (appearance === 'base' ? '' : appearance[0].toUpperCase() + appearance.slice(1))
  const baseKey = propPrefix
  const disabledKey = createKey(propPrefix, 'disabled')
  const focusKey = createKey(propPrefix, 'focus')
  const hoverKey = createKey(propPrefix, 'hover')
  const pressedKey = createKey(propPrefix, 'pressed')
  const fallbackBaseKey = appearance === 'base' ? baseKey : 'color'
  const fallbackDisabledKey = appearance === 'base' ? baseKey : 'colorDisabled'
  const fallbackFocusKey = appearance === 'base' ? baseKey : 'colorFocus'
  const fallbackHoverKey = appearance === 'base' ? baseKey : 'colorHover'
  const fallbackPressedKey = appearance === 'base' ? baseKey : 'colorPressed'
  return cM(appearance, {
    color: pallete[baseKey] || pallete[fallbackBaseKey]
  }, [
    cM('disabled', {
      color: pallete[disabledKey] || pallete[fallbackDisabledKey]
    }),
    cNotM('disabled', [
      c('&:focus', {
        color: pallete[focusKey] || pallete[fallbackFocusKey]
      }),
      c('&:hover', {
        color: pallete[hoverKey] || pallete[fallbackHoverKey]
      }),
      c('&:active', {
        color: pallete[pressedKey] || pallete[fallbackPressedKey]
      }),
      cM('pressed', {
        color: pallete[pressedKey] || pallete[fallbackPressedKey]
      })
    ])
  ])
}

function createBorderStyle (pallete) {
  return [
    cM('ghost, base', {
      borderColor: pallete.borderColor || pallete.color
    }, [
      cM('disabled', {
        borderColor: pallete.borderColorDisabled || pallete.colorDisabled
      }),
      cNotM('disabled', [
        c('&:focus', {
          borderColor: pallete.borderColorFocus || pallete.colorFocus
        }, [
          createBorderMaskStyle(pallete.borderColorFocus || pallete.colorFocus)
        ]),
        c('&:hover', {
          borderColor: pallete.borderColorHover || pallete.colorHover
        }, [
          createBorderMaskStyle(pallete.borderColorHover || pallete.colorHover)
        ]),
        c('&:active', {
          borderColor: pallete.borderColorPressed || pallete.colorPressed
        }, [
          createBorderMaskStyle(pallete.borderColorPressed || pallete.colorPressed)
        ]),
        cM('pressed', {
          borderColor: pallete.borderColorPressed || pallete.colorPressed
        }, [
          createBorderMaskStyle(pallete.borderColorPressed || pallete.colorPressed)
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
      backgroundColor: pallete.color
    }, [
      cM('disabled', {
        backgroundColor: pallete.colorDisabled
      }),
      cNotM('disabled', [
        c('&:focus', {
          backgroundColor: pallete.colorFocus
        }),
        c('&:hover', {
          backgroundColor: pallete.colorHover
        }),
        c('&:active', {
          backgroundColor: pallete.colorPressed
        }),
        cM('pressed', {
          backgroundColor: pallete.colorPressed
        })
      ])
    ]),
    cM('ghost, text', {
      backgroundColor: 'transparent'
    })
  ]
}
