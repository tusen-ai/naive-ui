import { c, cB, cTB, cE, cM, cNotM } from '../../../_utils/cssr'
import { read, createHoverColor, createActiveColor } from '../../../_utils/color'

function createRippleAnimation (digest, color, theme) {
  return [
    c(`@keyframes ${theme && theme + '-'}${digest}-button-wave-spread`, {
      from: {
        boxShadow: `0 0 0.5px 0 ${color}`
      },
      to: {
        // don't use exact 5px since chrome will display the animation with glitches
        boxShadow: `0 0 0.5px 4.5px ${color}`
      }
    }),
    c(`@keyframes ${theme && theme + '-'}${digest}-button-wave-opacity`, {
      from: {
        opacity: 0.6
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

function createPallete (color) {
  const textColor = null
  const rgb = read(color)
  const colorHover = createHoverColor(rgb)
  const colorActive = createActiveColor(rgb)
  const colorFocus = colorHover
  return {
    color,
    colorHover,
    colorActive,
    colorFocus,
    textColor
  }
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
    let digest
    let pallete
    if (props.colorDigest) {
      digest = props.colorDigest
      pallete = createPallete(props.color)
    } else {
      digest = props.$instance.type
      pallete = props.$local[digest]
    }
    const theme = props.$renderedTheme
    return [
      createRippleAnimation(
        digest,
        pallete.rippleColor || pallete.borderColor || pallete.color,
        theme
      ),
      cTB(
        'button',
        [
          cM(`${digest}-colored`, createColorProps(
            pallete.textColor,
            pallete.color,
            pallete.borderColor || pallete.color
          ), [
            // wave animation
            cB('base-wave', [
              cM('active', {
                zIndex: 1,
                animationName: `${theme && theme + '-'}${digest}-button-wave-spread, ${theme && theme + '-'}${digest}-button-wave-opacity`
              })
            ]),
            // button styles
            createIconColorStyle(pallete.textColor),
            digest === 'default' ? [
              createIconColorStyle(pallete.iconColor)
            ] : [],
            cNotM('disabled', [
              cM(
                'active',
                createColorProps(
                  pallete.textColorActive || pallete.textColor,
                  pallete.colorActive,
                  pallete.borderColorActive || pallete.colorActive
                ),
                [
                  createBorderMaskStyle(pallete.borderColorActive || pallete.colorActive),
                  createIconColorStyle(pallete.textColorActive || pallete.textColor)
                ]
              ),
              cNotM('active', [
                c('&:hover', createColorProps(
                  pallete.textColorHover || pallete.textColor,
                  pallete.colorHover,
                  pallete.borderColorHover || pallete.colorHover
                ), [
                  createBorderMaskStyle(pallete.borderColorHover || pallete.colorHover),
                  createIconColorStyle(pallete.textColorHover || pallete.textColor)
                ]),
                c('&:active', createColorProps(
                  pallete.textColorActive || pallete.textColor,
                  pallete.colorActive,
                  pallete.borderColorActive || pallete.colorActive
                ), [
                  createBorderMaskStyle(pallete.borderColorActive || pallete.colorActive),
                  createIconColorStyle(pallete.textColorActive || pallete.textColor)
                ])
              ]),
              c('&:not(:active):focus', [
                cNotM('active', createColorProps(
                  pallete.textColorFocus || pallete.textColor,
                  pallete.colorFocus,
                  pallete.borderColorFocus || pallete.colorFocus
                ), [
                  createBorderMaskStyle(pallete.borderColorFocus || pallete.colorFocus),
                  createIconColorStyle(pallete.textColorFocus || pallete.textColor)
                ])
              ])
            ]),
            cM(`ghost`, createColorProps(
              pallete.ghostTypedTextColor || pallete.color, 'transparent', pallete.borderColor || pallete.color
            ), [
              createIconColorStyle(pallete.ghostTypedTextColor || pallete.color),
              digest === 'default' ? [
                createIconColorStyle(pallete.iconColor)
              ] : [],
              cNotM('disabled', [
                cM(
                  'active',
                  createColorProps(
                    pallete.ghostTypedTextColorActive || pallete.colorActive,
                    'transparent',
                    pallete.borderColorActive || pallete.colorActive
                  ),
                  [
                    createBorderMaskStyle(pallete.borderColorActive || pallete.colorActive),
                    createIconColorStyle(pallete.ghostTypedTextColorActive || pallete.colorActive)
                  ]
                ),
                cNotM('active', [
                  c('&:hover', createColorProps(
                    pallete.ghostTypedTextColorHover || pallete.colorHover,
                    'transparent',
                    pallete.borderColorHover || pallete.colorHover
                  ), [
                    createBorderMaskStyle(pallete.borderColorHover || pallete.colorHover),
                    createIconColorStyle(pallete.ghostTypedTextColorHover || pallete.colorHover)
                  ]),
                  c('&:active', createColorProps(
                    pallete.ghostTypedTextColorActive || pallete.colorActive,
                    'transparent',
                    pallete.borderColorActive || pallete.colorActive
                  ), [
                    createBorderMaskStyle(pallete.borderColorActive || pallete.colorActive),
                    createIconColorStyle(pallete.ghostTypedTextColorActive || pallete.colorActive)
                  ])
                ]),
                c('&:not(:active):focus', [
                  cNotM('active', createColorProps(
                    pallete.ghostTypedTextColorHover || pallete.colorHover,
                    'transparent',
                    pallete.borderColorFocus || pallete.colorFocus
                  ), [
                    createBorderMaskStyle(pallete.borderColorFocus || pallete.colorFocus),
                    createIconColorStyle(pallete.ghostTypedTextColorHover || pallete.colorHover)
                  ])
                ])
              ])
            ]),
            cM('text', ({
              color: pallete.textTypedTextColor || pallete.color
            }), [
              createIconColorStyle(pallete.textTypedTextColor || pallete.color),
              digest === 'default' ? [
                createIconColorStyle(pallete.iconColor)
              ] : [],
              cNotM('disabled', [
                cM(
                  'active',
                  createColorProps(
                    pallete.textTypedTextColorActive || pallete.colorActive,
                    null,
                    null
                  ),
                  [
                    createIconColorStyle(pallete.textTypedTextColorActive || pallete.colorActive)
                  ]
                ),
                cNotM('active', [
                  c('&:hover', createColorProps(
                    pallete.textTypedTextColorHover || pallete.colorHover,
                    null,
                    null
                  ), [
                    createIconColorStyle(pallete.textTypedTextColorHover || pallete.colorHover)
                  ]),
                  c('&:active', createColorProps(
                    pallete.textTypedTextColorActive || pallete.colorActive,
                    null,
                    null
                  ), [
                    createIconColorStyle(pallete.textTypedTextColorActive || pallete.colorActive)
                  ])
                ]),
                c('&:not(:active):focus', [
                  cNotM('active', createColorProps(
                    pallete.textTypedTextColorFocus || pallete.colorFocus,
                    null,
                    null
                  ), [
                    createIconColorStyle(pallete.textTypedTextColorFocus || pallete.colorFocus)
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
