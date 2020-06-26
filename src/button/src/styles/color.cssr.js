import { c, cB, cTB2, cE, cM, cNotM } from '../../../_utils/cssr'
import { read, createHoverColor, createActiveColor } from '../../../_utils/color'

function createRippleAnimation (digest, color, theme) {
  return [
    c(`@keyframes ${theme}-${digest}-button-wave-spread`, {
      from: {
        boxShadow: `0 0 0 ${color}`
      },
      to: {
        // don't use exact 5px since chrome will display the animation with glitches
        boxShadow: `0 0 0.5px 4.5px ${color}`
      }
    }),
    c(`@keyframes ${theme}-${digest}-button-wave-opacity`, {
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
  const hoverColor = createHoverColor(rgb)
  const activeColor = createActiveColor(rgb)
  const focusColor = hoverColor
  return {
    color,
    hoverColor,
    activeColor,
    focusColor,
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
      cTB2(
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
                animationName: `${theme}-${digest}-button-wave-spread, ${theme}-${digest}-button-wave-opacity`
              })
            ]),
            // button styles
            createIconColorStyle(pallete.textColor),
            digest === 'default' ? [
              createIconColorStyle(pallete.iconColor)
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
                createIconColorStyle(pallete.iconColor)
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
        ]
      )
    ]
  }
])
