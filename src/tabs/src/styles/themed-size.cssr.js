import { c, cM, cB, cE } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const { labelSize } = props.$instance
    const fontSize = props.$local.fontSize[labelSize]
    return cB('tabs', [
      cM(`${labelSize}-size`, [
        cM('line-type', [
          cB('tabs-label', [
            cE('label', {
              fontSize: fontSize
            })
          ])
        ])
      ])
    ])
  }
])
