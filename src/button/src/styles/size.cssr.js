import { c, cB, cE, cM, cNotM, namespace } from '../../../_utils/cssr'
import formatLength from '../../../_utils/css/formatLength'

export default c([
  ({ props }) => {
    const theme = props.$renderedTheme
    const size = props.$instance.size
    const height = props.height[size]
    const fontSize = props.fontSize[size]
    const borderRadius = props.borderRadius
    const padding = props.padding[size]
    const roundPadding = props.roundPadding[size]
    const roundBorderRadius = formatLength(height, 0.5)
    const lineHeight = formatLength(height, 1, -2)
    const iconSize = props.iconSize[size]
    return cB(
      'button',
      [
        c(
          theme === props.$fallbackTheme ? '' : `&.${namespace}-${theme}-theme`,
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
                  // icon switch transition
                }),
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
                  })
                ])
              ])
            ])
          ]
        )
      ]
    )
  }
])
