import { c, cB, cTB, cE, cM, createKey } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$vm.size
    const { $local } = props
    return cTB('result',
      [
        cM(`${size}-size`, [
          cB('result-icon', {
            raw: `
              display: flex;
              justify-content: center;
            `
          }, [
            cE('status-image', {
              width: $local[createKey('iconSize', size)]
            })
          ]),
          cB('result-header', [
            cE('title', {
              fontSize: $local[createKey('headerFontSize', size)]
            }),
            cE('description', {
              fontSize: $local[createKey('descriptionFontSize', size)]
            })
          ])
        ])
      ]
    )
  }
])
