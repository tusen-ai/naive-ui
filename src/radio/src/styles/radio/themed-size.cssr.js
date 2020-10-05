import { c, cB, cE, cM } from '../../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.mergedSize
    const fontSize = props.$local.fontSize[size]
    const radioSize = props.$local.radioSize[size]
    return cB(
      'radio',
      [
        cM(`${size}-size`, {
          fontSize
        }, [
          cE('dot', {
            height: radioSize,
            width: radioSize
          })
        ])
      ]
    )
  }
])
