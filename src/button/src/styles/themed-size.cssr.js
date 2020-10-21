import { c, cB, cTB, cE, cM, createKey } from '../../../_utils/cssr'
import formatLength from '../../../_utils/css/formatLength'

export default c([
  ({ props }) => {
    const size = props.$instance.mergedSize
    const local = props.$local
    const height = local[createKey('height', size)]
    const fontSize = local[createKey('fontSize', size)]
    const borderRadius = local[createKey('borderRadius', size)]
    const padding = local[createKey('padding', size)]
    const roundPadding = local[createKey('paddingRound', size)]
    const roundBorderRadius = formatLength(height, 0.5)
    const lineHeight = formatLength(height, 1, -2)
    const iconSize = local[createKey('iconSize', size)]
    const iconMargin = local[createKey('iconMargin', size)]
    return cTB(
      'button',
      [
        cM(`${size}-size`, {
          borderRadius,
          fontSize
        }, [
          cM('base, ghost', {
            height,
            lineHeight,
            padding
          }, [
            cM('round', {
              padding: roundPadding,
              borderRadius: roundBorderRadius
            }),
            cM('circle', {
              borderRadius: roundBorderRadius,
              width: height,
              padding: '0 !important'
            })
          ]),
          cM('text', {
            padding: 0,
            borderRadius: 0
          }, [
            cE('icon', {
              height: iconSize,
              lineHeight: iconSize
            })
          ]),
          cM('hide-icon-margin', [
            cE('icon', {
              marginRight: 0
            })
          ]),
          cE('icon', {
            lineHeight,
            height: lineHeight,
            width: iconSize,
            maxWidth: iconSize,
            fontSize: iconSize,
            marginRight: iconMargin
          }, [
            cB('icon', {
              fontSize: iconSize,
              lineHeight: iconSize,
              height: iconSize
            }),
            cB('base-loading', {
              height: formatLength(iconSize, 1, -2),
              width: formatLength(iconSize, 1, -2)
            })
          ]),
          cE('content', [
            c('~', [
              cE('icon', {
                marginLeft: iconMargin,
                marginRight: 0
              })
            ])
          ])
        ])
      ]
    )
  }
])
