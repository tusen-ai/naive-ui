import { cTB2, c, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize
    const local = props.$local
    const height = local.height[size]
    const fontSize = local.fontSize[size]
    const width = local.width[size]
    return cTB2('input-number', {
      height,
      lineHeight: height
    }, [
      cE('minub-button, add-button, input', {
        height,
        lineHeight: height
      }),
      cE('minus-button, add-button', {
        width
      }),
      cE('input', {
        fontSize,
        padding: `0 ${width}`
      })
    ])
  }
])
