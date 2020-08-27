import { c, cB, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize
    const height = props.$local.height[size]
    return cB(
      'radio-group',
      [
        cM(`${size}-size`, [
          cM('splitor', {
            height
          })
        ])
      ]
    )
  }
])
