import { createStyleAsFormItem, createThemedStyle, c, cB, cTB, cE, cM } from '../../../../_utils/cssr'
import theme from './theme'

function styleAsFormItem () {
  return createStyleAsFormItem(
    createThemedStyle(cTB('base-suffix', [
      ({ context, props }) => {
        const pallete = context.pallete
        const status = props.status
        return [
          cB('base-suffix-cross', [
            c('&:hover', [
              cE('icon', {
                fill: pallete.crossColor[status].hover
              })
            ]),
            c('&:active', [
              cE('icon', {
                fill: pallete.crossColor[status].active
              })
            ])
          ]),
          cB('base-suffix-arrow', [
            cM('active', [
              c('&::after', {
                borderLeftColor: pallete.arrowColor[status].active,
                borderBottomColor: pallete.arrowColor[status].active
              })
            ])
          ])
        ]
      }
    ]), theme)
  )
}

let style = null

export function mountStyleAsFormItem () {
  if (style === null) {
    style = styleAsFormItem()
    style.mount({
      target: 'base-suffix-error',
      count: false,
      props: {
        status: 'error'
      }
    })
    style.mount({
      target: 'base-suffix-warning',
      count: false,
      props: {
        status: 'warning'
      }
    })
  }
}
