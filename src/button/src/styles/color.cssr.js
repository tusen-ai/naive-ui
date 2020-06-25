import { c, cB, cTB2, cE, cM, cNotM, namespace } from '../../../_utils/cssr'

const ns = namespace

function createRippleAnimation (digest, color, theme) {
  return [
    c(`@keyframes ${ns}-${theme ? theme + '-' : ''}button-${digest}-colored-ripple-spread`, {
      from: {
        boxShadow: `0 0 0 0 ${color}`
      },
      to: {
        boxShadow: `0 0 0 4px ${color}`
      }
    }),
    c(`@keyframes ${ns}-${theme ? theme + '-' : ''}button-${digest}-colored-ripple-opacity`, {
      from: {
        opacity: 0.4
      },
      to: {
        opacity: 0
      }
    })
  ]
}

function createColorProps (
  color, backgroundColor, borderColor
) {
  const properties = {}
  if (color) properties.color = color
  if (backgroundColor) properties.backgroundColor = backgroundColor
  if (borderColor) properties.border = `1px solid ${borderColor}`
  return properties
}

function createIconColorStyle (iconColor) {
  return cE('icon', [
    cB('icon', {
      fill: iconColor,
      stroke: iconColor
    }),
    cB('base-loading', {
      fill: iconColor,
      stroke: iconColor
    })
  ])
}

function createBorderMaskStyle (color) {
  return cE('border-mask', {
    boxShadow: `inset 0 0 0 1px ${color}`
  })
}

export default c([
  ({ props }) => {
    const instanceColor = props.$instance.color
    const instanceType = props.$instance.type
    const digest = instanceColor || instanceType
    const pallete = props.$local[digest]
    const theme = props.$renderedTheme
    return [
      createRippleAnimation(
        digest,
        pallete.rippleColor || pallete.borderColor || pallete.color,
        theme
      ),
      cTB2(
        'button',
        [
          cM(`${digest}-colored`, [
            cM(`${digest}-colored`, createColorProps(
              pallete.textColor,
              pallete.color,
              pallete.borderColor || pallete.color
            ), [
              createIconColorStyle(pallete.textColor),
              digest === 'default' ? [
                cM('tertiary-icon-depth', [
                  createIconColorStyle(pallete.tertiaryDepthIconColor)
                ])
              ] : [],
              cNotM('disabled', [
                cM(
                  'enter-pressed',
                  createColorProps(
                    pallete.activeTextColor || pallete.textColor,
                    pallete.activeColor,
                    pallete.activeBorderColor || pallete.activeColor
                  ),
                  [
                    createBorderMaskStyle(pallete.activeBorderColor || pallete.activeColor),
                    createIconColorStyle(pallete.activeTextColor || pallete.textColor)
                  ]
                ),
                cNotM('enter-pressed', [
                  c('&:hover', createColorProps(
                    pallete.hoverTextColor || pallete.textColor,
                    pallete.hoverColor,
                    pallete.hoverBorderColor || pallete.hoverColor
                  ), [
                    createBorderMaskStyle(pallete.hoverBorderColor || pallete.hoverColor),
                    createIconColorStyle(pallete.hoverTextColor || pallete.textColor)
                  ]),
                  c('&:active', createColorProps(
                    pallete.activeTextColor || pallete.textColor,
                    pallete.activeColor,
                    pallete.activeBorderColor || pallete.activeColor
                  ), [
                    createBorderMaskStyle(pallete.activeBorderColor || pallete.activeColor),
                    createIconColorStyle(pallete.activeTextColor || pallete.textColor)
                  ])
                ]),
                c('&:not(:active):focus', [
                  cNotM('enter-pressed', createColorProps(
                    pallete.focusTextColor || pallete.textColor,
                    pallete.focusColor,
                    pallete.focusBorderColor || pallete.focusColor
                  ), [
                    createBorderMaskStyle(pallete.focusBorderColor || pallete.focusColor),
                    createIconColorStyle(pallete.focusTextColor || pallete.textColor)
                  ])
                ]),
                cM('rippling', [
                  c('&::after', {
                    animationName: `${ns}-${theme ? theme + '-' : ''}button-${digest}-colored-ripple-spread, ${ns}-${theme ? theme + '-' : ''}button-${digest}-colored-ripple-opacity`
                  })
                ])
              ]),
              cM(`ghost`, createColorProps(
                pallete.ghostTypedTextColor || pallete.color, 'transparent', pallete.borderColor || pallete.color
              ), [
                createIconColorStyle(pallete.ghostTypedTextColor || pallete.color),
                digest === 'default' ? [
                  cM('tertiary-icon-depth', [
                    createIconColorStyle(pallete.tertiaryDepthIconColor)
                  ])
                ] : [],
                cNotM('disabled', [
                  cM(
                    'enter-pressed',
                    createColorProps(
                      pallete.ghostTypedActiveTextColor || pallete.activeColor,
                      'transparent',
                      pallete.activeBorderColor || pallete.activeColor
                    ),
                    [
                      createBorderMaskStyle(pallete.activeBorderColor || pallete.activeColor),
                      createIconColorStyle(pallete.ghostTypedActiveTextColor || pallete.activeColor)
                    ]
                  ),
                  cNotM('enter-pressed', [
                    c('&:hover', createColorProps(
                      pallete.ghostTypedHoverTextColor || pallete.hoverColor,
                      'transparent',
                      pallete.hoverBorderColor || pallete.hoverColor
                    ), [
                      createBorderMaskStyle(pallete.hoverBorderColor || pallete.hoverColor),
                      createIconColorStyle(pallete.ghostTypedHoverTextColor || pallete.hoverColor)
                    ]),
                    c('&:active', createColorProps(
                      pallete.ghostTypedActiveTextColor || pallete.activeColor,
                      'transparent',
                      pallete.activeBorderColor || pallete.activeColor
                    ), [
                      createBorderMaskStyle(pallete.activeBorderColor || pallete.activeColor),
                      createIconColorStyle(pallete.ghostTypedActiveTextColor || pallete.activeColor)
                    ])
                  ]),
                  c('&:not(:active):focus', [
                    cNotM('enter-pressed', createColorProps(
                      pallete.ghostTypedHoverTextColor || pallete.hoverColor,
                      'transparent',
                      pallete.focusBorderColor || pallete.focusColor
                    ), [
                      createBorderMaskStyle(pallete.focusBorderColor || pallete.focusColor),
                      createIconColorStyle(pallete.ghostTypedHoverTextColor || pallete.hoverColor)
                    ])
                  ])
                ])
              ]),
              cM('text', ({
                color: pallete.textTypedTextColor || pallete.color
              }), [
                createIconColorStyle(pallete.textTypedTextColor || pallete.color),
                digest === 'default' ? [
                  cM('tertiary-icon-depth', [
                    createIconColorStyle(pallete.tertiaryDepthIconColor)
                  ])
                ] : [],
                cNotM('disabled', [
                  cM(
                    'enter-pressed',
                    createColorProps(
                      pallete.textTypedActiveTextColor || pallete.activeColor,
                      null,
                      null
                    ),
                    [
                      createIconColorStyle(pallete.textTypedActiveTextColor || pallete.activeColor)
                    ]
                  ),
                  cNotM('enter-pressed', [
                    c('&:hover', createColorProps(
                      pallete.textTypedHoverTextColor || pallete.hoverColor,
                      null,
                      null
                    ), [
                      createIconColorStyle(pallete.textTypedHoverTextColor || pallete.hoverColor)
                    ]),
                    c('&:active', createColorProps(
                      pallete.textTypedActiveTextColor || pallete.activeColor,
                      null,
                      null
                    ), [
                      createIconColorStyle(pallete.textTypedActiveTextColor || pallete.activeColor)
                    ])
                  ]),
                  c('&:not(:active):focus', [
                    cNotM('enter-pressed', createColorProps(
                      pallete.textTypedFocusTextColor || pallete.focusColor,
                      null,
                      null
                    ), [
                      createIconColorStyle(pallete.textTypedFocusTextColor || pallete.focusColor)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]
      )
    ]
  }
])
