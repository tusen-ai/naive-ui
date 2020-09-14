import { c, cB, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize || props.$instance.size
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    const itemLabelHeight = props.$local.itemLabelHeight[size]
    const getNumber = str => {
      return Number(str.replace(/[^0-9]/ig, ''))
    }
    return cB('form-item', [
      cM(size + '-size', [
        cM('top-labelled', [
          cM('no-label', {
            paddingTop: itemLabelHeight
          }),
          cB('form-item-label', {
            fontSize: `${getNumber(fontSize) - 1}px`,
            height: itemLabelHeight
          })
        ]),
        cM('left-labelled', [
          cB('form-item-label', {
            fontSize: fontSize,
            height: `${getNumber(height) + 6}px`,
            lineHeight: `${getNumber(height) + 6}px`
          })
        ]),
        cB('form-item-blank', {
          minHeight: height
        }),
        cB('form-item-feedback-wrapper', {
          fontSize: fontSize
        })
      ])
    ])
  }
])
