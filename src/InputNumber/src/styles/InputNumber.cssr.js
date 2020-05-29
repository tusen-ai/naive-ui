import { createStyleAsFormItem, createThemedStyle, c, cTB, cB, cE } from '../../../_utils/cssr'
import theme from './theme'

function styleAsFormItem () {
  return createStyleAsFormItem(
    createThemedStyle(c([
      ({ props, context }) => {
        const pallete = context.pallete
        const status = props.status
        return cTB('input-number', [
          cE('border-mask', {
            boxShadow: pallete[status].borderMaskBoxShadow.default
          }),
          cE('input', {
            caretColor: pallete[status].caretColor
          }, [
            c('&:hover ~', [
              cE('border-mask', {
                boxShadow: pallete[status].borderMaskBoxShadow.hover
              })
            ]),
            c('&:focus', {
              backgroundColor: pallete[status].backgroundColor.focus
            }, [
              c('& ~', [
                cE('border-mask', {
                  boxShadow: pallete[status].borderMaskBoxShadow.focus
                })
              ])
            ])
          ]),
          cE('add-button, minus-button', [
            c('&:hover', [
              cB('icon', {
                fill: pallete[status].buttonTextColor.hover
              })
            ]),
            c('&:active', [
              cB('icon', {
                fill: pallete[status].buttonTextColor.active
              })
            ])
          ])
        ])
      }
    ]), theme)
  )
}

let style = null

export function mountStyleAsFormItem () {
  if (style === null) {
    style = styleAsFormItem()
    style.mount({
      target: 'input-number-error',
      count: false,
      props: {
        status: 'error'
      }
    })
    style.mount({
      target: 'input-number-warning',
      count: false,
      props: {
        status: 'warning'
      }
    })
  }
}
