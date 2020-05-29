import { createStyleAsFormItem, createThemedStyle, c, cB, cTB, cNotM, cM } from '../../../../_utils/cssr'
import theme from './theme'

function styleAsFormItem () {
  return createStyleAsFormItem(
    createThemedStyle(cTB(
      'base-selection',
      [
        ({ context, props }) => {
          const pallete = context.pallete
          const status = props.status
          return [
            cB('base-selection-border-mask', {
              boxShadow: pallete[status].borderMaskBoxShadow.default
            }),
            cNotM('disabled', [
              cM('active', [
                cB('base-selection-border-mask', {
                  boxShadow: pallete[status].borderMaskBoxShadow.active
                }),
                cB('base-selection-label', {
                  backgroundColor: pallete[status].backgroundColor.active
                }),
                cB('base-selection-tags', {
                  backgroundColor: pallete[status].backgroundColor.active
                })
              ]),
              cNotM('active', [
                cB('base-selection-label', [
                  c('&:hover ~', [
                    cB('base-selection-border-mask', {
                      boxShadow: pallete[status].borderMaskBoxShadow.hover
                    })
                  ]),
                  c('&:focus ~', [
                    cB('base-selection-border-mask', {
                      boxShadow: pallete[status].borderMaskBoxShadow.focus
                    })
                  ])
                ]),
                cB('base-selection-tags', [
                  c('&:hover ~', [
                    cB('base-selection-border-mask', {
                      boxShadow: pallete[status].borderMaskBoxShadow.hover
                    })
                  ]),
                  c('&:focus ~', [
                    cB('base-selection-border-mask', {
                      boxShadow: pallete[status].borderMaskBoxShadow.focus
                    })
                  ])
                ]),
                cM('focus', [
                  cB('base-selection-border-mask', {
                    boxShadow: pallete[status].borderMaskBoxShadow.focus
                  })
                ])
              ])
            ])
          ]
        }
      ]
    ), theme)
  )
}

let style = null

export function mountStyleAsFormItem () {
  if (style === null) {
    style = styleAsFormItem()
    style.mount({
      target: 'base-selection-error',
      count: false,
      props: {
        status: 'error'
      }
    })
    style.mount({
      target: 'base-selection-warning',
      count: false,
      props: {
        status: 'warning'
      }
    })
  }
}
