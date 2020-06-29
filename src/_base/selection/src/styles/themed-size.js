import { cTB2, c, cB, cE, cM } from '../../../../_utils/cssr'
import formatLength from '../../../../_utils/css/formatLength'

// TODO split form-item styles out
export default c([
  ({ props }) => {
    return cTB2('base-selection', [
      ['small', 'medium', 'large'].map(size => {
        const height = props.$local.height[size]
        const fontSize = props.$local.fontSize[size]
        return cM(size + '-size', {
          fontSize
        }, [
          cE('placeholder', {
            height,
            lineHeight: height
          }),
          cB('base-selection-babel', {
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
      })
    ])
  }
])
