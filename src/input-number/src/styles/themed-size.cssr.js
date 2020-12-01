import { cTB, c, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { $local } = props
    const size = props.$vm.mergedSize
    const height = $local[createKey('height', size)]
    const width = $local[createKey('width', size)]
    const fontSize = $local[createKey('fontSize', size)]
    const buttonIconSize = $local[createKey('buttonIconSize', size)]
    const buttonWidth = $local[createKey('buttonWidth', size)]
    return cTB('input-number', [
      cM(size + '-size', {
        height,
        width,
        lineHeight: height
      }, [
        cE('button, input', {
          height,
          lineHeight: height
        }),
        cE('button', {
          width: buttonWidth,
          fontSize: buttonIconSize
        }),
        cE('input', {
          padding: `0 ${buttonWidth}`,
          fontSize
        })
      ])
    ])
  }
])
