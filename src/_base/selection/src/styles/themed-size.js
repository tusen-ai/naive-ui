import { cTB, c, cB, cE, cM } from '../../../../_utils/cssr'
import formatLength from '../../../../_utils/css/formatLength'

export default c([
  ({ props }) => {
    const size = props.$instance.size
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    return cTB('base-selection', [
      cM(size + '-size', {
        minHeight: height,
        lineHeight: height,
        fontSize
      }, [
        cE('placeholder', {
          height,
          lineHeight: height
        }),
        cB('base-selection-label', {
          height,
          lineHeight: height
        }),
        cB('base-selection-tags', {
          minHeight: height
        }, [
          cB('base-selection-input-tag', {
            height: formatLength(height, 1, -6),
            lineHeight: formatLength(height, 1, -6)
          })
        ])
      ])
    ])
  }
])
