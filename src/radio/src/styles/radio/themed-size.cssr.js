import { c, cB, cE, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize
    const fontSize = props.$local.fontSize[size]
    const radioSize = props.$local.radioSize[size]
    return cB(
      'radio',
      [
        cM(`${size}-size`, {
          fontSize
        }, [
          cE('control', {
            height: radioSize,
            width: radioSize
          })
        ])
      ]
    )
  }
])
