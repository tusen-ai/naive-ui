import { cTB, c, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const local = props.$local
    const size = props.$instance.mergedSize
    const height = local[createKey('height', size)]
    const fontSize = local[createKey('fontSize', size)]
    const width = local[createKey('buttonWidth', size)]
    return cTB('input-number', [
      cM(size + '-size', {
        height,
        lineHeight: height
      }, [
        cE('button, input', {
          height,
          lineHeight: height
        }),
        cE('button', {
          width
        }),
        cE('input', {
          fontSize,
          padding: `0 ${width}`
        })
      ])
    ])
  }
])
