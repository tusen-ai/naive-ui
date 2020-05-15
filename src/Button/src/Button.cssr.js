import { c, cB, cE, cM, cNotM } from '../../_utils/cssr'

function createRippleAnimation (props) {
  return [
    c(`@keyframes n-button-${props.digest}-colored-ripple-spread`, {
      from: {
        boxShadow: `0 0 0 0 ${props.color}`
      },
      to: {
        boxShadow: `0 0 0 4px ${props.color}`
      }
    }),
    c(`@keyframes n-button-${props.digest}-colored-ripple-opacity`, {
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
      fill: color + '!important',
      stroke: color + '!important'
    }),
    cB('base-loading', {
      fill: color + '!important',
      stroke: color + '!important'
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
    ({ props }) => createRippleAnimation(props),
    cB('button', [
      ({ props }) => cM(`${props.digest}-type`, createBasicColorProps(
        null, props.color, props.color
      ), [
        cNotM('disabled', [
          cM(
            'enter-pressed',
            createBasicColorProps(props.textColor, props.activeColor, props.activeColor),
            [
              createBorderMaskStyle(props.activeColor),
              createIconColorStyle(props.textColor)
            ]
          ),
          cNotM('enter-pressed', [
            c('&:hover', createBasicColorProps(props.textColor, props.hoverColor, props.hoverColor), [
              createBorderMaskStyle(props.hoverColor),
              createIconColorStyle(props.textColor)
            ]),
            c('&:active', createBasicColorProps(props.textColor, props.activeColor, props.activeColor), [
              createBorderMaskStyle(props.activeColor),
              createIconColorStyle(props.textColor)
            ])
          ]),
          c('&:not(:active):focus', [
            cNotM('enter-pressed', createBasicColorProps(props.textColor, props.focusColor, props.focusColor), [
              createBorderMaskStyle(props.focusColor),
              createIconColorStyle(props.textColor)
            ])
          ]),
          cM('rippling', [
            c('&::after', {
              animationName: `n-button-${props.digest}-colored-ripple-spread, n-button-${props.digest}-colored-ripple-opacity`
            })
          ])
        ]),
        cM(`ghost`, createBasicColorProps(
          props.color, 'transparent', props.color
        ), [
          createIconColorStyle(props.color),
          cNotM('disabled', [
            cM(
              'enter-pressed',
              createBasicColorProps(props.activeColor, 'transparent', props.color),
              [
                createBorderMaskStyle(props.activeColor),
                createIconColorStyle(props.activeColor)
              ]
            ),
            cNotM('enter-pressed', [
              c('&:hover', createBasicColorProps(props.hoverColor, 'transparent', props.color), [
                createBorderMaskStyle(props.hoverColor),
                createIconColorStyle(props.hoverColor)
              ]),
              c('&:active', createBasicColorProps(props.activeColor, 'transparent', props.color), [
                createBorderMaskStyle(props.activeColor),
                createIconColorStyle(props.activeColor)
              ])
            ]),
            c('&:not(:active):focus', [
              cNotM('enter-pressed', createBasicColorProps(props.focusColor, 'transparent', props.color), [
                createBorderMaskStyle(props.focusColor),
                createIconColorStyle(props.focusColor)
              ])
            ])
          ])
        ]),
        cM('text', ({
          color: props.color
        }), [
          createIconColorStyle(props.color),
          cNotM('disabled', [
            cM(
              'enter-pressed',
              createBasicColorProps(props.activeColor, null, null),
              [
                createIconColorStyle(props.activeColor)
              ]
            ),
            cNotM('enter-pressed', [
              c('&:hover', createBasicColorProps(props.hoverColor, null, null), [
                createIconColorStyle(props.hoverColor)
              ]),
              c('&:active', createBasicColorProps(props.activeColor, null, null), [
                createIconColorStyle(props.activeColor)
              ])
            ]),
            c('&:not(:active):focus', [
              cNotM('enter-pressed', createBasicColorProps(props.focusColor, null, null), [
                createBorderMaskStyle(props.focusColor),
                createIconColorStyle(props.focusColor)
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
