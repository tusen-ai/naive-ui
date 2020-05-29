import { createStyleAsFormItem, createThemedStyle, c, cTB, cE, cM } from '../../../_utils/cssr'
import theme from './theme'

function createInputStyleAsFormItem () {
  return createThemedStyle(
    createStyleAsFormItem(cTB('input', [
      ({
        context,
        props
      }) => {
        const pallete = context.pallete
        const status = props.status
        return [
          cM('stateful', [
            cE('border-mask', {
              borderColor: pallete[status].borderMaskBorderColor.default
            }),
            c('&:hover', [
              cE('border-mask', {
                borderColor: pallete[status].borderMaskBorderColor.hover
              })
            ]),
            cM('focus', {
              backgroundColor: pallete[status].backgroundColor.focus
            }, [
              cE('border-mask', {
                borderColor: pallete[status].borderMaskBorderColor.focus,
                boxShadow: pallete[status].borderMaskBoxShadow.focus
              })
            ]),
            cE('input, textarea', {
              caretColor: pallete[status].caretColor.default
            })
          ])
        ]
      }
    ])),
    theme
  )
}

let inputStyleAsFormItem = null

export function mountStyleAsFormItem () {
  if (!inputStyleAsFormItem) {
    inputStyleAsFormItem = createInputStyleAsFormItem()
    inputStyleAsFormItem.mount({
      target: 'n-input-error',
      count: false,
      props: {
        status: 'error'
      }
    })
    inputStyleAsFormItem.mount({
      target: 'n-input-warning',
      count: false,
      props: {
        status: 'warning'
      }
    })
  }
}
