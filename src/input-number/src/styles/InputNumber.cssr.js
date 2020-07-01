import { createStyleAsFormItem, createThemedStyle, c, cTB, cB, cE } from '../../../_utils/cssr'
import theme from './theme'

function styleAsFormItem () {
  return createStyleAsFormItem(
    createThemedStyle(c([
      ({ props, context }) => {
        const pallete = context.pallete
        const status = props.status
        const subPallete = pallete[status]
        return cTB('input-number', [
          cE('border-mask', {
            boxShadow: subPallete.borderMaskBoxShadow.default
          }),
          cE('input', {
            caretColor: subPallete.caretColor
          }, [
            c('&:hover ~', [
              cE('border-mask', {
                boxShadow: subPallete.borderMaskBoxShadow.hover
              })
            ]),
            c('&:focus', {
              backgroundColor: subPallete.backgroundColor.focus
            }, [
              c('& ~', [
                cE('border-mask', {
                  boxShadow: subPallete.borderMaskBoxShadow.focus
                })
              ])
            ])
          ]),
          cE('add-button, minus-button', [
            c('&:hover', [
              cB('icon', {
                fill: subPallete.buttonTextColor.hover
              })
            ]),
            c('&:active', [
              cB('icon', {
                fill: subPallete.buttonTextColor.active
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
