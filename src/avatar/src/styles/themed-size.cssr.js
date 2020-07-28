import { c, cE, cM, cTB, cB } from '../../../_utils/cssr'
import depx from '../../../_utils/css/depx'
import pxfy from '../../../_utils/css/pxfy'

export default c([
  ({ props }) => {
    const { size } = props.$instance
    const { height } = props.$local
    if (typeof size === 'number') {
      return null
    }
    const halfHeight = pxfy(depx(height[size]) / 2)

    return cTB('avatar', [
      cM(`${size}-size`, {
        height: height[size],
        width: height[size]
      }, [
        cM('circle-shaped', {
          borderRadius: halfHeight
        }),
        cM('round-shaped', {
          borderRadius: halfHeight
        }),
        cE('text', {
          lineHeight: 1.25
        }),
        cB('icon', {
          fontSize: height[size]
        })
      ])
    ])
  }
])
