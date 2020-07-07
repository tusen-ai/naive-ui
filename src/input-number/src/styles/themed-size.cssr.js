import { cTB, c, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize
    const local = props.$local
    const height = local.height[size]
    const fontSize = local.fontSize[size]
    const width = local.buttonWidth[size]
    return cTB('input-number', [
      cM(size + '-size', {
        height,
        lineHeight: height
      }, [
        cE('button, input', {
          height,
          lineHeight: height
        }),
        cE('button', {
          width
        }),
        cE('input', {
          fontSize,
          padding: `0 ${width}`
        })
      ])
    ])
  }
])
