import { c, cB, cTB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const size = props.$instance.size
    const { iconSize, headerFontSize, descriptionFontSize } = props.$local
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
              raw: `
                width: ${iconSize[size]}
              `
            })
          ]),
          cB('result-header', [
            cE('title', {
              raw: `
                font-size: ${headerFontSize[size]}
              `
            }),
            cE('description', {
              raw: `
                font-size: ${descriptionFontSize[size]}
              `
            })
          ])
        ])
      ]
    )
  }
])
