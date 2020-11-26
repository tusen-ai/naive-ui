import { c, cTB, cB, cM, cNotM } from '../../../_utils/cssr'
import { depx, pxfy } from '../../../_utils/css'

export default c([
  ({ props }) => {
    const {
      textColor,
      color,
      boxShadow,
      borderRadius,
      arrowWidth
    } = props.$local
    const {
      cubicBezierEaseInOut,
      cubicBezierEaseIn,
      cubicBezierEaseOut,
      transformDebounceScale
    } = props.$base
    return [
      cTB('popover', {
        raw: `
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut};
          transform-origin: inherit;
          transform: ${transformDebounceScale};
          position: relative;
          font-size: 13px;
          color: ${textColor};
          
        `
      }, [
        bodyTransition(
          transformDebounceScale,
          cubicBezierEaseOut,
          cubicBezierEaseIn
        ),
        cNotM('raw', {
          raw: `
            background-color: ${color};
            border-radius: ${borderRadius};
            padding: 8px 14px;
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
              width: ${pxfy(depx(arrowWidth) * 2)};
              height: ${pxfy(depx(arrowWidth) * 2)};
              box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
              transform: rotate(45deg);
              background-color: ${color};
            `
          })
        ]),
        cM('shadow', {
          raw: `
            box-shadow: ${boxShadow};
          `
        })
      ]),
      placementStyle(arrowWidth, 'top-start', `
        top: -${arrowWidth};
        left: 10px;
      `),
      placementStyle(arrowWidth, 'top', `
        top: -${arrowWidth};
        transform: translateX(-${arrowWidth}) rotate(45deg) ;
        left: 50%;
      `),
      placementStyle(arrowWidth, 'top-end', `
        top: -${arrowWidth};
        right: 10px;
      `),
      placementStyle(arrowWidth, 'bottom-start', `
        bottom: -${arrowWidth};
        left: 10px;
      `),
      placementStyle(arrowWidth, 'bottom', `
        bottom: -${arrowWidth};
        transform: translateX(-${arrowWidth}) rotate(45deg) ;
        left: 50%;
      `),
      placementStyle(arrowWidth, 'bottom-end', `
        bottom: -${arrowWidth};
        right: 10px;
      `),
      placementStyle(arrowWidth, 'left-start', `
        left: -${arrowWidth};
        top: 10px;
      `),
      placementStyle(arrowWidth, 'left', `
        left: -${arrowWidth};
        transform: translateY(-${arrowWidth}) rotate(45deg) ;
        top: 50%;
      `),
      placementStyle(arrowWidth, 'left-end', `
        left: -${arrowWidth};
        bottom: 10px;
      `),
      placementStyle(arrowWidth, 'right-start', `
        right: -${arrowWidth};
        top: 10px;
      `),
      placementStyle(arrowWidth, 'right', `
        right: -${arrowWidth};
        transform: translateY(-${arrowWidth}) rotate(45deg) ;
        top: 50%;
      `),
      placementStyle(arrowWidth, 'right-end', `
        right: -${arrowWidth};
        bottom: 10px;
      `),
      tooltipStyle(props.$local)
    ]
  }
])

function tooltipStyle (pallete) {
  const {
    borderRadius,
    boxShadow,
    tooltipColor,
    tooltipTextColor
  } = pallete
  return cTB('popover', [
    cM('tooltip', {
      raw: `
        padding: 8px 14px;
        border-radius: ${borderRadius};
        box-shadow: ${boxShadow};
        background-color: ${tooltipColor};
        color: ${tooltipTextColor};
      `
    }, [
      cB('popover-arrow-wrapper', [
        cB('popover-arrow', {
          backgroundColor: tooltipColor
        })
      ])
    ])
  ])
}

const oppositePlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

function placementStyle (
  arrowWidth,
  placement,
  arrowStyleLiteral
) {
  const arrowWrapperSpace = pxfy(depx(arrowWidth) * 2)
  const position = placement.split('-')[0]
  const sizeStyle = ['top', 'bottom'].includes(position) ? {
    height: arrowWrapperSpace
  } : { width: arrowWrapperSpace }
  return c(`[v-placement="${placement}"]`, [
    cB('popover',
      {
        raw: `
          margin-${oppositePlacement[position]}: 10px;
        `
      }, [
        cM('no-arrow', {
          raw: `
            margin-${position}: 6px;
            margin-${oppositePlacement[position]}: 6px;
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
