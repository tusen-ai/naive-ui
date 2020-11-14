import { c, cTB, cM, cB, cE, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { labelSize } = props.$instance
    const { $local } = props
    return cTB('tabs', [
      cM(`${labelSize}-size`, [
        cM('line-type', [
          cB('tabs-label', [
            cE('label', {
              fontSize: $local[createKey('fontSize', labelSize)]
            })
          ])
        ])
      ])
    ])
  }
])
