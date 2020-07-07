import { cTB, c, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.size
    const local = props.$local
    const fontSize = local.fontSize[size]
    const height = local.height[size]
    return cTB('input-group-label', [
      cM(size + '-size', {
        fontSize,
        lineHeight: height,
        height
      })
    ])
  }
])
