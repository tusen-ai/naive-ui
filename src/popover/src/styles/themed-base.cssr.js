import { c, cTB, cB, cM } from '../../../_utils/cssr'
import depx from '../../../_utils/css/depx'
import pxfy from '../../../_utils/css/pxfy'

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
      easeInOutCubicBezier,
      easeInCubicBezier,
      easeOutCubicBezier,
      transformDebounceScale
    } = props.$base
    return [
      cTB('popover-body', {
        raw: `
          transition:
            background-color .3s ${easeInOutCubicBezier},
            color .3s ${easeInOutCubicBezier};
          transform-origin: inherit;
          transform: ${transformDebounceScale};
          position: relative;
          font-size: 13px;
          color: ${textColor};
        `
      }, [
        bodyTransition(
          transformDebounceScale,
          easeOutCubicBezier,
          easeInCubicBezier
        ),
        cM('styled', {
          raw: `
            background-color: ${color};
            border-radius: ${borderRadius};
            padding: 8px 14px;
          `
        }),
        cM('fix-width', {
          raw: `
            white-space: normal;
            width: max-content;
            box-sizing: border-box;
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
              transition: background-color .3s ${easeInOutCubicBezier};
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
        cM('no-arrow',
          [ 'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right-start',
            'right',
            'right-end'
          ].map(direction => noArrowStyle(direction))
        ),
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
        cM('shadow', {
          raw: `
            box-shadow: ${boxShadow};
          `
        })
      ]),
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
  return cB('tooltip', [
    cTB('tooltip-body', {
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
  const approximatePlacement = placement.split('-')[0]
  const sizeStyle = ['top', 'bottom'].includes(approximatePlacement) ? {
    height: arrowWrapperSpace
  } : { width: arrowWrapperSpace }
  return c(`&[n-placement$="${placement}"]`, {
    raw: `
      margin-${oppositePlacement[approximatePlacement]}: 10px;
    `
  }, [
    cB('popover-arrow-wrapper', {
      raw: `
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        ${approximatePlacement}: 100%;
        ${oppositePlacement[approximatePlacement]}: auto;
      `,
      ...sizeStyle
    }, [
      cB('popover-arrow', {
        raw: arrowStyleLiteral
      })
    ])
  ])
}

function noArrowStyle (placement) {
  const approximatePlacement = placement.split('-')[0]
  return c(`&[n-placement$="${placement}"]`, {
    raw: `
      margin-${approximatePlacement}: 6px;
      margin-${oppositePlacement[approximatePlacement]}: 6px;
    `
  })
}

function bodyTransition (
  transformDebounceScale,
  easeOutCubicBezier,
  easeInCubicBezier
) {
  return [
    c('&.popover-body-transition-enter-from, &.popover-body-transition-leave-to', {
      raw: `
        opacity: 0;
        transform: scale(.85);
      `
    }),
    c('&.popover-body-transition-enter-to, &.popover-body-transition-leave-from', {
      raw: `
        transform: ${transformDebounceScale};
        opacity: 1;
      `
    }),
    c('&.popover-body-transition-enter-active', {
      raw: `
        transition:
          opacity .15s ${easeOutCubicBezier},
          transform .15s ${easeOutCubicBezier};
      `
    }),
    c('&.popover-body-transition-leave-active', {
      raw: `
        transition:
          opacity .15s ${easeInCubicBezier},
          transform .15s ${easeInCubicBezier};
      `
    })
  ]
}
