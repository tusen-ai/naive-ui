import { c, cB, cM } from '../../../_utils/cssr'
import depx from '../../../_utils/css/depx'
import pxfy from '../../../_utils/css/pxfy'

export default c([
  ({ props }) => {
    const {
      fontSize,
      height
    } = props.$local
    const { size } = props.$instance
    const theHeight = height[size]
    const subMenuHeight = pxfy(depx(theHeight) * 6.6)
    return cB(
      'cascader-menu',
      [
        cM(`${size}-size`, {
        }, [
          cB('cascader-submenu', {
            height: subMenuHeight
          }, [
            cB('cascader-option', {
              raw: `
                height: ${theHeight};
                line-height: ${theHeight};
                font-size: ${fontSize[size]};
              `
            })
          ])
        ])
      ]
    )
  }
])
