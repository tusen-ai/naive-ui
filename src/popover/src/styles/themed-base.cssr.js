import { c, cB, cM } from '../../../_utils/cssr'
import depx from '../../../_utils/css/depx'
import pxfy from '../../../_utils/css/pxfy'

function popoverContentTransition (pallete, easeOutCubicBezier, easeInCubicBezier) {
  return [
    c('&&-transition-enter-to, &&-transition-leave', {
      raw: `
        transform: ${pallete.transformDebounceScale};
        opacity: 1;
      `
    }),
    c('&&-transition-enter, &&-transition-leave-to', {
      raw: `
        opacity: 0;
        transform: scale(.85);
      `
    }),
    c('&&-transition-enter-active', {
      raw: `
        transition: opacity .15s ${easeOutCubicBezier}, transform .15s ${easeOutCubicBezier};
      `
    }),
    c('&&-transition-leave-active', {
      raw: `
        transition: opacity .15s ${easeInCubicBezier}, transform .15s ${easeInCubicBezier};
      `
    })
  ]
}
function noArrowNPlaceMixin (direction) {
  return c(`&[n-placement$="${direction}"]`, {
    raw: `
      margin-bottom: 6px;
    `
  })
}
const oppsiteDirection = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}
function nPlacementMixin (pallete, direction, popoverArrowContent) {
  const finalDirection = direction.split('-')[0]
  return c(`&[n-placement$="${direction}"]`, {
    raw: `
      margin-${oppsiteDirection[finalDirection]}: 10px;
    `
  }, [
    cB('popover-arrow-wrapper', {
      raw: `
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        ${finalDirection}: 100%;
        ${oppsiteDirection[finalDirection]}: auto;
        height: ${pxfy(depx(pallete.arrowWidth) * 2)};
      `
    }, [
      cB('popover-arrow', {
        raw: `
          ${popoverArrowContent}
        `
      })
    ])
  ])
}

export default c([
  ({ props }) => {
    const {
      transformDebounceScale,
      textColor,
      color,
      boxShadow,
      borderRadius,
      arrowWidth
    } = props.$local

    const {
      easeInOutCubicBezier,
      easeInCubicBezier,
      easeOutCubicBezier
    } = props.$base
    const pallete = props.$local
    return [
      cB('popover-content', {
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
        popoverContentTransition(pallete, easeOutCubicBezier, easeInCubicBezier),
        cM('styled', {
          raw: `
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
              box-shadow: ${boxShadow};
              transform: rotate(45deg);
            `
          })
        ]),
        cM('no-arrow', [
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
          ].map(direction => noArrowNPlaceMixin(direction))
        ]),
        nPlacementMixin(pallete, 'top-start',
          `
          top: -${arrowWidth};
          left: 10px;
        `),
        nPlacementMixin(pallete, 'top',
          `
          top: -${arrowWidth};
          transform: translateX(-${arrowWidth}) rotate(45deg) ;
          left: 50%;
        `),
        nPlacementMixin(pallete, 'top-end',
          `
          top: -${arrowWidth};
          right: 10px;
        `),
        nPlacementMixin(pallete, 'bottom-start',
          `
          bottom: -${arrowWidth};
          left: 10px;
        `),
        nPlacementMixin(pallete, 'bottom',
          `
          bottom: -${arrowWidth};
          transform: translateX(-${arrowWidth}) rotate(45deg) ;
          left: 50%;
        `),
        nPlacementMixin(pallete, 'bottom-end',
          `
          bottom: -${arrowWidth};
          right: 10px;
        `),
        nPlacementMixin(pallete, 'left-start',
          `
          left: -${arrowWidth};
          top: 10px;
        `),
        nPlacementMixin(pallete, 'left',
          `
          left: -${arrowWidth};
          transform: translateY(-${arrowWidth}) rotate(45deg) ;
          top: 50%;
        `),
        nPlacementMixin(pallete, 'left-end',
          `
          left: -${arrowWidth};
          bottom: 10px;
        `),
        nPlacementMixin(pallete, 'right-start',
          `
          right: -${arrowWidth};
          top: 10px;
        `),
        nPlacementMixin(pallete, 'right',
          `
          right: -${arrowWidth};
          transform: translateY(-${arrowWidth}) rotate(45deg) ;
          top: 50%;
        `),
        nPlacementMixin(pallete, 'right-end',
          `
          right: -${arrowWidth};
          bottom: 10px;
        `),
        cM('styled', {
          raw: `
          background-color: ${color};
          `
        }),
        cB('popover-arrow-wrapper', [
          cB('popover-arrow', {
            raw: `
              background-color: ${color};
            `
          })
        ]),
        cM('shadow', {
          raw: `
            box-shadow: ${boxShadow};
          `
        })
      ])
    ]
  }
])
