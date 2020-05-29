import { c, cB, cTB, cE, cM, cNotM, namespace } from '../../../_utils/cssr'

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

function createBasicColorProps (
  color, backgroundColor, borderColor
) {
  const props = {}
  if (color) props.color = color
  if (backgroundColor) props.backgroundColor = backgroundColor
  if (borderColor) props.border = `1px solid ${borderColor}`
  return props
}

function createIconColorStyle (color) {
  return cE('icon', [
    cB('icon', {
      fill: color,
      stroke: color
    }),
    cB('base-loading', {
      fill: color,
      stroke: color
    })
  ])
}

function createBorderMaskStyle (color) {
  return cE('border-mask', {
    boxShadow: `inset 0 0 0 1px ${color}`
  })
}

export function createColorStyle () {
  return c([
    ({ props, context }) => {
      const digest = props.digest || props.type
      const pallete = (props && props.pallete) || context.pallete[digest]
      const theme = context.theme
      return [
        createRippleAnimation(digest, pallete.rippleColor || pallete.borderColor || pallete.color, theme),
        cTB('button', [
          cM(`${digest}-colored`, createBasicColorProps(
            pallete.textColor, pallete.color, pallete.borderColor || pallete.color
          ), [
            createIconColorStyle(pallete.textColor),
            cNotM('disabled', [
              cM(
                'enter-pressed',
                createBasicColorProps(
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
                c('&:hover', createBasicColorProps(
                  pallete.hoverTextColor || pallete.textColor,
                  pallete.hoverColor,
                  pallete.hoverBorderColor || pallete.hoverColor
                ), [
                  createBorderMaskStyle(pallete.hoverBorderColor || pallete.hoverColor),
                  createIconColorStyle(pallete.hoverTextColor || pallete.textColor)
                ]),
                c('&:active', createBasicColorProps(
                  pallete.activeTextColor || pallete.textColor,
                  pallete.activeColor,
                  pallete.activeBorderColor || pallete.activeColor
                ), [
                  createBorderMaskStyle(pallete.activeBorderColor || pallete.activeColor),
                  createIconColorStyle(pallete.activeTextColor || pallete.textColor)
                ])
              ]),
              c('&:not(:active):focus', [
                cNotM('enter-pressed', createBasicColorProps(
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
            cM(`ghost`, createBasicColorProps(
              pallete.ghostTypedTextColor || pallete.color, 'transparent', pallete.borderColor || pallete.color
            ), [
              createIconColorStyle(pallete.ghostTypedTextColor || pallete.color),
              cNotM('disabled', [
                cM(
                  'enter-pressed',
                  createBasicColorProps(pallete.ghostTypedActiveTextColor || pallete.activeColor, 'transparent', pallete.activeBorderColor || pallete.activeColor),
                  [
                    createBorderMaskStyle(pallete.activeBorderColor || pallete.activeColor),
                    createIconColorStyle(pallete.ghostTypedActiveTextColor || pallete.activeColor)
                  ]
                ),
                cNotM('enter-pressed', [
                  c('&:hover', createBasicColorProps(pallete.ghostTypedHoverTextColor || pallete.hoverColor, 'transparent', pallete.hoverBorderColor || pallete.hoverColor), [
                    createBorderMaskStyle(pallete.hoverBorderColor || pallete.hoverColor),
                    createIconColorStyle(pallete.ghostTypedHoverTextColor || pallete.hoverColor)
                  ]),
                  c('&:active', createBasicColorProps(pallete.ghostTypedActiveTextColor || pallete.activeColor, 'transparent', pallete.activeBorderColor || pallete.activeColor), [
                    createBorderMaskStyle(pallete.activeBorderColor || pallete.activeColor),
                    createIconColorStyle(pallete.ghostTypedActiveTextColor || pallete.activeColor)
                  ])
                ]),
                c('&:not(:active):focus', [
                  cNotM('enter-pressed', createBasicColorProps(pallete.ghostTypedHoverTextColor || pallete.hoverColor, 'transparent', pallete.focusBorderColor || pallete.focusColor), [
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
              cNotM('disabled', [
                cM(
                  'enter-pressed',
                  createBasicColorProps(pallete.textTypedActiveTextColor || pallete.activeColor, null, null),
                  [
                    createIconColorStyle(pallete.textTypedActiveTextColor || pallete.activeColor)
                  ]
                ),
                cNotM('enter-pressed', [
                  c('&:hover', createBasicColorProps(pallete.textTypedHoverTextColor || pallete.hoverColor, null, null), [
                    createIconColorStyle(pallete.textTypedHoverTextColor || pallete.hoverColor)
                  ]),
                  c('&:active', createBasicColorProps(pallete.textTypedActiveTextColor || pallete.activeColor, null, null), [
                    createIconColorStyle(pallete.textTypedActiveTextColor || pallete.activeColor)
                  ])
                ]),
                c('&:not(:active):focus', [
                  cNotM('enter-pressed', createBasicColorProps(pallete.textTypedFocusTextColor || pallete.focusColor, null, null), [
                    createIconColorStyle(pallete.textTypedFocusTextColor || pallete.focusColor)
                  ])
                ])
              ])
            ])
          ])
        ])
      ]
    }
  ])
}
