import { c, cTB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      fontSize,
      iconSize: iconSizeMap
    } = props.$local
    const size = props.$instance.size
    const iconSize = iconSizeMap[size]
    return cTB('empty', [
      cM(
        `${size}-size`,
        {
          fontSize: fontSize[size]
        },
        [
          cE('icon', {
            raw: `
              width: ${iconSize};
              height: ${iconSize};
              font-size: ${iconSize};
              line-height: ${iconSize};
            `
          })
        ]
      )
    ])
  }
])
