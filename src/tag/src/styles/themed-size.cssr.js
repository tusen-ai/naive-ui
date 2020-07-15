import { c, cE, cM, cTB } from '../../../_utils/cssr'
import depx from '../../../_utils/css/depx'
import pxfy from '../../../_utils/css/pxfy'

export default c([
  ({ props }) => {
    const { size } = props.$instance
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    const numericHalfHeight = depx(height) / 2
    const halfHeight = pxfy(numericHalfHeight)
    return cTB('tag', [
      cM(`${size}-size`, {
        lineHeight: height,
        height,
        fontSize
      }, [
        cM('round', {
          padding: `0 ${halfHeight}`,
          borderRadius: halfHeight
        }, [
          cM('closable', {
            paddingRight: pxfy(10 + numericHalfHeight)
          }, [
            cE('close', {
              right: pxfy(numericHalfHeight - 6)
            })
          ])
        ])
      ])
    ])
  }
])
