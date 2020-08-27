import { c, cB, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    return cB(
      'radio-group',
      [
        cM(`${size}-size`, [
          cM('button-group', {
            lineHeight: height,
            height
          }),
          cM('radio-button', {
            lineHeight: height,
            height,
            fontSize
          })
        ])
      ]
    )
  }
])
