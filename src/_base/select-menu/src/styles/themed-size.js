import { cTB, c, cB, cM, createKey } from '../../../../_utils/cssr'
import { depx, pxfy } from '../../../../_utils/css'

export default c([
  ({ props }) => {
    const size = props.$instance.size
    const fontSize = props.$local[createKey('optionFontSize', size)]
    const optionHeight = props.$local[createKey('optionHeight', size)]
    const groupHeaderFontSize = pxfy(depx(fontSize) - 2)
    const menuHeight = pxfy(depx(optionHeight) * 7.6)
    const padding = props.$local[createKey('padding', size)]
    return cTB('base-select-menu', [
      cM(size + '-size', {
        padding
      }, [
        cB('scrollbar', {
          maxHeight: menuHeight
        }),
        cB('virtual-list', {
          maxHeight: menuHeight
        }),
        cB('base-select-option', {
          height: optionHeight,
          lineHeight: optionHeight,
          fontSize: fontSize
        }),
        cB('base-select-group-header', {
          height: optionHeight,
          lineHeight: optionHeight,
          fontSize: groupHeaderFontSize
        })
      ])
    ])
  }
])
