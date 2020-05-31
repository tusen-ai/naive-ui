import { c, cB, cTB, cE, cM, cNotM, namespace } from '../../../_utils/cssr'
import { composite, read } from '../../../_utils/color/index'

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

function createIconColorStyle (base, color) {
  if (!color) return []
  let neuralizedColor
  if (!base && color) neuralizedColor = color
  else {
    const colorRgba = read(color)
    if (colorRgba[3] === 1) neuralizedColor = color
    else {
      neuralizedColor = composite(
        read(base),
        read(color)
      )
    }
  }
  return cE('icon', [
    cB('icon', {
      fill: neuralizedColor,
      stroke: neuralizedColor
    }),
    cB('base-loading', {
      fill: neuralizedColor,
      stroke: neuralizedColor
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
      const subpallete = (props && props.pallete) || context.pallete[digest]
      if (!subpallete) throw new Error('[naive-ui/button]: can\'t find the color of the button.')
      const theme = context.theme
      const baseBgColor = subpallete.baseBackgroundColor
      return [
        createRippleAnimation(digest, subpallete.rippleColor || subpallete.borderColor || subpallete.color, theme),
        cTB('button', [
          cM(`${digest}-colored`, createBasicColorProps(
            subpallete.textColor, subpallete.color, subpallete.borderColor || subpallete.color
          ), [
            createIconColorStyle(baseBgColor, subpallete.textColor),
            digest === 'default' ? [
              cM('tertiary-icon-depth', [
                createIconColorStyle(baseBgColor, subpallete.tertiaryDepthIconColor)
              ])
            ] : [],
            cNotM('disabled', [
              cM(
                'enter-pressed',
                createBasicColorProps(
                  subpallete.activeTextColor || subpallete.textColor,
                  subpallete.activeColor,
                  subpallete.activeBorderColor || subpallete.activeColor
                ),
                [
                  createBorderMaskStyle(subpallete.activeBorderColor || subpallete.activeColor),
                  createIconColorStyle(baseBgColor, subpallete.activeTextColor || subpallete.textColor)
                ]
              ),
              cNotM('enter-pressed', [
                c('&:hover', createBasicColorProps(
                  subpallete.hoverTextColor || subpallete.textColor,
                  subpallete.hoverColor,
                  subpallete.hoverBorderColor || subpallete.hoverColor
                ), [
                  createBorderMaskStyle(subpallete.hoverBorderColor || subpallete.hoverColor),
                  createIconColorStyle(baseBgColor, subpallete.hoverTextColor || subpallete.textColor)
                ]),
                c('&:active', createBasicColorProps(
                  subpallete.activeTextColor || subpallete.textColor,
                  subpallete.activeColor,
                  subpallete.activeBorderColor || subpallete.activeColor
                ), [
                  createBorderMaskStyle(subpallete.activeBorderColor || subpallete.activeColor),
                  createIconColorStyle(baseBgColor, subpallete.activeTextColor || subpallete.textColor)
                ])
              ]),
              c('&:not(:active):focus', [
                cNotM('enter-pressed', createBasicColorProps(
                  subpallete.focusTextColor || subpallete.textColor,
                  subpallete.focusColor,
                  subpallete.focusBorderColor || subpallete.focusColor
                ), [
                  createBorderMaskStyle(subpallete.focusBorderColor || subpallete.focusColor),
                  createIconColorStyle(baseBgColor, subpallete.focusTextColor || subpallete.textColor)
                ])
              ]),
              cM('rippling', [
                c('&::after', {
                  animationName: `${ns}-${theme ? theme + '-' : ''}button-${digest}-colored-ripple-spread, ${ns}-${theme ? theme + '-' : ''}button-${digest}-colored-ripple-opacity`
                })
              ])
            ]),
            cM(`ghost`, createBasicColorProps(
              subpallete.ghostTypedTextColor || subpallete.color, 'transparent', subpallete.borderColor || subpallete.color
            ), [
              createIconColorStyle(baseBgColor, subpallete.ghostTypedTextColor || subpallete.color),
              digest === 'default' ? [
                cM('tertiary-icon-depth', [
                  createIconColorStyle(baseBgColor, subpallete.tertiaryDepthIconColor)
                ])
              ] : [],
              cNotM('disabled', [
                cM(
                  'enter-pressed',
                  createBasicColorProps(subpallete.ghostTypedActiveTextColor || subpallete.activeColor, 'transparent', subpallete.activeBorderColor || subpallete.activeColor),
                  [
                    createBorderMaskStyle(subpallete.activeBorderColor || subpallete.activeColor),
                    createIconColorStyle(baseBgColor, subpallete.ghostTypedActiveTextColor || subpallete.activeColor)
                  ]
                ),
                cNotM('enter-pressed', [
                  c('&:hover', createBasicColorProps(subpallete.ghostTypedHoverTextColor || subpallete.hoverColor, 'transparent', subpallete.hoverBorderColor || subpallete.hoverColor), [
                    createBorderMaskStyle(subpallete.hoverBorderColor || subpallete.hoverColor),
                    createIconColorStyle(baseBgColor, subpallete.ghostTypedHoverTextColor || subpallete.hoverColor)
                  ]),
                  c('&:active', createBasicColorProps(subpallete.ghostTypedActiveTextColor || subpallete.activeColor, 'transparent', subpallete.activeBorderColor || subpallete.activeColor), [
                    createBorderMaskStyle(subpallete.activeBorderColor || subpallete.activeColor),
                    createIconColorStyle(baseBgColor, subpallete.ghostTypedActiveTextColor || subpallete.activeColor)
                  ])
                ]),
                c('&:not(:active):focus', [
                  cNotM('enter-pressed', createBasicColorProps(subpallete.ghostTypedHoverTextColor || subpallete.hoverColor, 'transparent', subpallete.focusBorderColor || subpallete.focusColor), [
                    createBorderMaskStyle(subpallete.focusBorderColor || subpallete.focusColor),
                    createIconColorStyle(baseBgColor, subpallete.ghostTypedHoverTextColor || subpallete.hoverColor)
                  ])
                ])
              ])
            ]),
            cM('text', ({
              color: subpallete.textTypedTextColor || subpallete.color
            }), [
              createIconColorStyle(baseBgColor, subpallete.textTypedTextColor || subpallete.color),
              digest === 'default' ? [
                cM('tertiary-icon-depth', [
                  createIconColorStyle(baseBgColor, subpallete.tertiaryDepthIconColor)
                ])
              ] : [],
              cNotM('disabled', [
                cM(
                  'enter-pressed',
                  createBasicColorProps(subpallete.textTypedActiveTextColor || subpallete.activeColor, null, null),
                  [
                    createIconColorStyle(baseBgColor, subpallete.textTypedActiveTextColor || subpallete.activeColor)
                  ]
                ),
                cNotM('enter-pressed', [
                  c('&:hover', createBasicColorProps(subpallete.textTypedHoverTextColor || subpallete.hoverColor, null, null), [
                    createIconColorStyle(baseBgColor, subpallete.textTypedHoverTextColor || subpallete.hoverColor)
                  ]),
                  c('&:active', createBasicColorProps(subpallete.textTypedActiveTextColor || subpallete.activeColor, null, null), [
                    createIconColorStyle(baseBgColor, subpallete.textTypedActiveTextColor || subpallete.activeColor)
                  ])
                ]),
                c('&:not(:active):focus', [
                  cNotM('enter-pressed', createBasicColorProps(subpallete.textTypedFocusTextColor || subpallete.focusColor, null, null), [
                    createIconColorStyle(baseBgColor, subpallete.textTypedFocusTextColor || subpallete.focusColor)
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
