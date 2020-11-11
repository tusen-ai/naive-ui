import { c, cE, cM, cTB, createKey } from '../../../_utils/cssr'
import { depx, pxfy } from '../../../_utils/css'

export default c([
  ({ props }) => {
    const { size } = props.$instance
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    const closeSize = props.$local[createKey('closeSize', size)]
    const numericHalfHeight = depx(height) / 2
    const halfHeight = pxfy(numericHalfHeight)
    return cTB('tag', [
      cM(`${size}-size`, {
        lineHeight: height,
        height,
        fontSize
      }, [
        cE('close', {
          fontSize: closeSize
        }),
        cM('round', {
          padding: `0 ${halfHeight}`,
          borderRadius: halfHeight
        })
      ])
    ])
  }
])
