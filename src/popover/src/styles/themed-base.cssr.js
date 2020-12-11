import { c, cTB, cB, cM, cNotM } from '../../../_utils/cssr'
import { depx, pxfy } from 'seemly'

export default c([
  ({ props }) => {
    const {
      $local,
      $global: {
        cubicBezierEaseInOut,
        cubicBezierEaseIn,
        cubicBezierEaseOut,
        transformDebounceScale
      }
    } = props
    const {
      padding,
      fontSize,
      textColor,
      color,
      boxShadow,
      borderRadius,
      arrowHeight,
      arrowOffset
    } = $local
    return [
      cTB('popover', {
        raw: `
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut};
          transform-origin: inherit;
          transform: ${transformDebounceScale};
          position: relative;
          font-size: ${fontSize};
          color: ${textColor};
        `
      }, [
        bodyTransition(
          transformDebounceScale,
          cubicBezierEaseOut,
          cubicBezierEaseIn
        ),
        cNotM('raw, tooltip', {
          raw: `
            background-color: ${color};
            border-radius: ${borderRadius};
            padding: ${padding};
          `
        }),
        cB('popover-arrow-wrapper', {
          raw: `
            position: absolute;
            overflow: hidden;
            pointer-events: none;
          `
        }, [
          cB('popover-arrow', {
            raw: `
              transition: background-color .3s ${cubicBezierEaseInOut};
              position: absolute;
              display: block;
              width: ${pxfy(depx(arrowHeight) * 2)};
              height: ${pxfy(depx(arrowHeight) * 2)};
              box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
              transform: rotate(45deg);
              background-color: ${color};
              pointer-events: all;
            `
          })
        ]),
        cM('shadow', {
          boxShadow: boxShadow
        })
      ]),
      placementStyle($local, 'top-start', `
        top: -${arrowHeight};
        left: ${arrowOffset};
      `),
      placementStyle($local, 'top', `
        top: -${arrowHeight};
        transform: translateX(-${arrowHeight}) rotate(45deg);
        left: 50%;
      `),
      placementStyle($local, 'top-end', `
        top: -${arrowHeight};
        right: ${arrowOffset};
      `),
      placementStyle($local, 'bottom-start', `
        bottom: -${arrowHeight};
        left: ${arrowOffset};
      `),
      placementStyle($local, 'bottom', `
        bottom: -${arrowHeight};
        transform: translateX(-${arrowHeight}) rotate(45deg);
        left: 50%;
      `),
      placementStyle($local, 'bottom-end', `
        bottom: -${arrowHeight};
        right: ${arrowOffset};
      `),
      placementStyle($local, 'left-start', `
        left: -${arrowHeight};
        top: ${arrowOffset};
      `),
      placementStyle($local, 'left', `
        left: -${arrowHeight};
        transform: translateY(-${arrowHeight}) rotate(45deg);
        top: 50%;
      `),
      placementStyle($local, 'left-end', `
        left: -${arrowHeight};
        bottom: ${arrowOffset};
      `),
      placementStyle($local, 'right-start', `
        right: -${arrowHeight};
        top: ${arrowOffset};
      `),
      placementStyle($local, 'right', `
        right: -${arrowHeight};
        transform: translateY(-${arrowHeight}) rotate(45deg);
        top: ${arrowOffset};
      `),
      placementStyle($local, 'right-end', `
        right: -${arrowHeight};
        bottom: ${arrowOffset};
      `)
    ]
  }
])

const oppositePlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

function placementStyle (
  $local,
  placement,
  arrowStyleLiteral
) {
  const {
    space,
    spaceArrow
  } = $local
  const position = placement.split('-')[0]
  const sizeStyle = ['top', 'bottom'].includes(position) ? {
    height: spaceArrow
  } : { width: spaceArrow }
  return c(`[v-placement="${placement}"]`, [
    cB('popover',
      {
        raw: `
          margin-${oppositePlacement[position]}: ${spaceArrow};
        `
      }, [
        cM('no-arrow', {
          raw: `
            margin-${position}: ${space};
            margin-${oppositePlacement[position]}: ${space};
          `
        }),
        cB('popover-arrow-wrapper', {
          raw: `
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
            ${position}: 100%;
            ${oppositePlacement[position]}: auto;
          `,
          ...sizeStyle
        }, [
          cB('popover-arrow', {
            raw: arrowStyleLiteral
          })
        ])
      ]
    )
  ])
}

function bodyTransition (
  transformDebounceScale,
  cubicBezierEaseOut,
  cubicBezierEaseIn
) {
  return [
    c('&.popover-transition-enter-from, &.popover-transition-leave-to', {
      raw: `
        opacity: 0;
        transform: scale(.85);
      `
    }),
    c('&.popover-transition-enter-to, &.popover-transition-leave-from', {
      raw: `
        transform: ${transformDebounceScale};
        opacity: 1;
      `
    }),
    c('&.popover-transition-enter-active', {
      raw: `
        transition:
          opacity .15s ${cubicBezierEaseOut},
          transform .15s ${cubicBezierEaseOut};
      `
    }),
    c('&.popover-transition-leave-active', {
      raw: `
        transition:
          opacity .15s ${cubicBezierEaseIn},
          transform .15s ${cubicBezierEaseIn};
      `
    })
  ]
}
