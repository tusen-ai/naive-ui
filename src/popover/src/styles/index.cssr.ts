import { CNode } from 'css-render'
import { map } from 'lodash-es'
import { FollowerPlacement } from 'vueuc'
import { c, cB, cM, cNotM, cE, cCB } from '../../../_utils/cssr'

const oppositePlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

const arrowSize = 'var(--n-arrow-height) * 1.414'

// vars:
// --n-bezier
// --n-bezier-ease-in
// --n-bezier-ease-out
// --n-font-size
// --n-text-color
// --n-color
// --n-border-radius
// --n-arrow-height
// --n-arrow-offset
// --n-arrow-offset-vertical
// --n-padding
// --n-space
// --n-space-arrow
// --n-divider-color
export default c([
  cB('popover', `
    transition:
      box-shadow .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      color .3s var(--n-bezier);
    position: relative;
    font-size: var(--n-font-size);
    color: var(--n-text-color);
    box-shadow: var(--n-box-shadow);
    word-break: break-word;
  `, [
    c('>', [
      cB('scrollbar', `
        height: inherit;
        max-height: inherit;
      `)
    ]),
    cNotM('raw', `
      background-color: var(--n-color);
      border-radius: var(--n-border-radius);
    `, [
      cNotM('scrollable', [
        cNotM('show-header-or-footer', 'padding: var(--n-padding);')
      ])
    ]),
    cE('header', `
      padding: var(--n-padding);
      border-bottom: 1px solid var(--n-divider-color);
      transition: border-color .3s var(--n-bezier);
    `),
    cE('footer', `
      padding: var(--n-padding);
      border-top: 1px solid var(--n-divider-color);
      transition: border-color .3s var(--n-bezier);
    `),
    cM('scrollable, show-header-or-footer', [
      cE('content', `
        padding: var(--n-padding);
      `)
    ])
  ]),
  cB('popover-shared', `
    transform-origin: inherit;
  `, [
    cB('popover-arrow-wrapper', `
      position: absolute;
      overflow: hidden;
      pointer-events: none;
    `, [
      cB('popover-arrow', `
        transition: background-color .3s var(--n-bezier);
        position: absolute;
        display: block;
        width: calc(${arrowSize});
        height: calc(${arrowSize});
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
        transform: rotate(45deg);
        background-color: var(--n-color);
        pointer-events: all;
      `)
    ]),
    // body transition
    c('&.popover-transition-enter-from, &.popover-transition-leave-to', `
      opacity: 0;
      transform: scale(.85);
    `),
    c('&.popover-transition-enter-to, &.popover-transition-leave-from', `
      transform: scale(1);
      opacity: 1;
    `),
    c('&.popover-transition-enter-active', `
      transition:
        box-shadow .3s var(--n-bezier),
        background-color .3s var(--n-bezier),
        color .3s var(--n-bezier),
        opacity .15s var(--n-bezier-ease-out),
        transform .15s var(--n-bezier-ease-out);
    `),
    c('&.popover-transition-leave-active', `
      transition:
        box-shadow .3s var(--n-bezier),
        background-color .3s var(--n-bezier),
        color .3s var(--n-bezier),
        opacity .15s var(--n-bezier-ease-in),
        transform .15s var(--n-bezier-ease-in);
    `)
  ]),
  placementStyle('top-start', `
    top: calc(${arrowSize} / -2);
    left: calc(${getArrowOffset('top-start')} - var(--v-offset-left));
  `),
  placementStyle('top', `
    top: calc(${arrowSize} / -2);
    transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
    left: 50%;
  `),
  placementStyle('top-end', `
    top: calc(${arrowSize} / -2);
    right: calc(${getArrowOffset('top-end')} + var(--v-offset-left));
  `),
  placementStyle('bottom-start', `
    bottom: calc(${arrowSize} / -2);
    left: calc(${getArrowOffset('bottom-start')} - var(--v-offset-left));
  `),
  placementStyle('bottom', `
    bottom: calc(${arrowSize} / -2);
    transform: translateX(calc(${arrowSize} / -2)) rotate(45deg);
    left: 50%;
  `),
  placementStyle('bottom-end', `
    bottom: calc(${arrowSize} / -2);
    right: calc(${getArrowOffset('bottom-end')} + var(--v-offset-left));
  `),
  placementStyle('left-start', `
    left: calc(${arrowSize} / -2);
    top: calc(${getArrowOffset('left-start')} - var(--v-offset-top));
  `),
  placementStyle('left', `
    left: calc(${arrowSize} / -2);
    transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
    top: 50%;
  `),
  placementStyle('left-end', `
    left: calc(${arrowSize} / -2);
    bottom: calc(${getArrowOffset('left-end')} + var(--v-offset-top));
  `),
  placementStyle('right-start', `
    right: calc(${arrowSize} / -2);
    top: calc(${getArrowOffset('right-start')} - var(--v-offset-top));
  `),
  placementStyle('right', `
    right: calc(${arrowSize} / -2);
    transform: translateY(calc(${arrowSize} / -2)) rotate(45deg);
    top: 50%;
  `),
  placementStyle('right-end', `
    right: calc(${arrowSize} / -2);
    bottom: calc(${getArrowOffset('right-end')} + var(--v-offset-top));
  `),
  ...map(
    {
      top: ['right-start', 'left-start'],
      right: ['top-end', 'bottom-end'],
      bottom: ['right-end', 'left-end'],
      left: ['top-start', 'bottom-start']
    },
    (placements, direction): CNode[] => {
      const isVertical = ['right', 'left'].includes(direction)
      const sizeType = isVertical ? 'width' : 'height'
      return placements.map(placement => {
        const isReverse = placement.split('-')[1] === 'end'
        const targetSize = `var(--v-target-${sizeType}, 0px)`
        const centerOffset = `calc((${targetSize} - ${arrowSize}) / 2)`
        const offset = getArrowOffset(placement as FollowerPlacement)
        return c(`[v-placement="${placement}"] >`, [
          cB('popover-shared', [
            cM('center-arrow', [
              cB(
                'popover-arrow',
                `${direction}: calc(max(${centerOffset}, ${offset}) ${
                  isReverse ? '+' : '-'
                } var(--v-offset-${isVertical ? 'left' : 'top'}));`
              )
            ])
          ])
        ])
      })
    }
  )
])

function getArrowOffset (placement: FollowerPlacement): string {
  return ['top', 'bottom'].includes(placement.split('-')[0])
    ? 'var(--n-arrow-offset)'
    : 'var(--n-arrow-offset-vertical)'
}

function placementStyle (
  placement: FollowerPlacement,
  arrowStyleLiteral: string
): CNode {
  const position = placement.split('-')[0] as
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
  const sizeStyle = ['top', 'bottom'].includes(position)
    ? 'height: var(--n-space-arrow);'
    : 'width: var(--n-space-arrow);'
  return c(`[v-placement="${placement}"] >`, [
    cB('popover-shared', `
      margin-${oppositePlacement[position]}: var(--n-space);
    `, [
      cM('show-arrow', `
        margin-${oppositePlacement[position]}: var(--n-space-arrow);
      `),
      cM('overlap', `
        margin: 0;
      `),
      cCB('popover-arrow-wrapper', `
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        ${position}: 100%;
        ${oppositePlacement[position]}: auto;
        ${sizeStyle}
      `, [
        cB('popover-arrow', arrowStyleLiteral)
      ])
    ])
  ])
}
