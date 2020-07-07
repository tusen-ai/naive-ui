import { c, cB, cTB, cE, cM, cNotM } from '../../../_utils/cssr'
import formatLength from '../../../_utils/css/formatLength'
import iconSwitchTransition from '../../../styles/_transitions/icon-switch'

export default c([
  ({ props }) => {
    const size = props.$instance.syntheticSize
    const height = props.$local.height[size]
    const fontSize = props.$local.fontSize[size]
    const borderRadius = props.$local.borderRadius
    const padding = props.$local.padding[size]
    const roundPadding = props.$local.roundPadding[size]
    const roundBorderRadius = formatLength(height, 0.5)
    const lineHeight = formatLength(height, 1, -2)
    const iconSize = props.$local.iconSize[size]
    return cTB(
      'button',
      [
        cM(`${size}-size`, {
          borderRadius,
          fontSize,
          whiteSpace: 'nowrap'
        }, [
          cNotM('text', {
            height,
            lineHeight: lineHeight,
            padding
          }),
          cM('round', {
            padding: roundPadding,
            borderRadius: roundBorderRadius
          }),
          cM('circle', {
            borderRadius: roundBorderRadius,
            width: height,
            padding: '0 !important'
          }),
          cM('text', {
            padding: 0,
            borderRadius: 0
          }, [
            cE('icon', {
              height: iconSize,
              lineHeight: iconSize
            })
          ]),
          cE('content', {
            display: 'inline-block',
            lineHeight: 'inherit'
          }),
          cE('icon', {
            display: 'inline-block',
            position: 'relative',
            lineHeight,
            height: lineHeight,
            width: iconSize,
            maxWidth: iconSize,
            verticalAlign: 'bottom'
          }, [
            cB('icon', {
              fontSize: iconSize
            }),
            cB('base-loading', {
              height: formatLength(iconSize, 1, -2),
              width: formatLength(iconSize, 1, -2),
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'block'
            }, [
              iconSwitchTransition({
                top: '50%',
                originalTransform: 'translateY(-50%)'
              })
            ]),
            cM('slot', {
              width: iconSize,
              fontSize: iconSize,
              display: 'inline-flex',
              alignItems: 'center',
              verticalAlign: 'bottom'
            }, [
              cB('icon-slot', {
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'block',
                lineHeight: iconSize,
                height: iconSize,
                fontSize: iconSize
              }, [
                iconSwitchTransition({
                  top: '50%',
                  originalTransform: 'translateY(-50%)'
                })
              ])
            ])
          ])
        ])
      ]
    )
  }
])
