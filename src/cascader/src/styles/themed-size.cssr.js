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
    const menuHeight = pxfy(depx(height[size]) * 6.6)
    return cB(
      'cascader-menu',
      [
        cM(`${size}-size`, {
        }, [
          cB('cascader-submenu', {
            height: menuHeight
          }, [
            cB('cascader-option', {
              raw: `
                height: ${height[size]};
                line-height: ${height[size]};
                font-size: ${fontSize[size]};
              `
            })
          ])
        ])
      ]
    )
  }
])
