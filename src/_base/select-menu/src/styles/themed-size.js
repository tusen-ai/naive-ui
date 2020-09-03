import { cTB, c, cB, cM, createKey } from '../../../../_utils/cssr'
import depx from '../../../../_utils/css/depx'
import pxfy from '../../../../_utils/css/pxfy'

export default c([
  ({ props }) => {
    const size = props.$instance.size
    const fontSize = props.$local[createKey('optionFontSize', size)]
    const optionHeight = props.$local[createKey('optionHeight', size)]
    const groupHeaderFontSize = pxfy(depx(fontSize) - 2)
    const menuHeight = pxfy(depx(optionHeight) * 7.6)
    return cTB('base-select-menu', [
      cM(size + '-size', [
        cB('virtual-scroller', {
          raw: `
            height: 100%;
            max-height: ${menuHeight};
            scrollbar-width: none;
            -moz-scrollbar-width: none;
          `
        }, [
          c('&::-webkit-scrollbar', {
            width: 0,
            height: 0
          })
        ]),
        cB('scrollbar-container', {
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
