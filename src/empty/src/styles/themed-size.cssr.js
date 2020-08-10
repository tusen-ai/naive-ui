import { c, cTB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      fontSize,
      iconSize
    } = props.$local
    const size = props.$instance.size
    const theIconSize = iconSize[size]
    return cTB('empty', [
      cM(
        `${size}-size`,
        {
          fontSize: fontSize[size]
        },
        [
          cE('icon', {
            raw: `
            width: ${theIconSize};
            height: ${theIconSize};
            font-size: ${theIconSize};
            line-height: ${theIconSize};
            `
          })
        ]
      )
    ])
  }
])
