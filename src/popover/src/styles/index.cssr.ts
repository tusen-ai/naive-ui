import { CNode } from 'css-render'
import { FollowerPlacement } from 'vueuc'
import { c, cB, cM, cNotM, cE, cCB } from '../../../_utils/cssr'

const oppositePlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

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
    transform-origin: inherit;
    position: relative;
    font-size: var(--n-font-size);
    color: var(--n-text-color);
    box-shadow: var(--n-box-shadow);
  `, [
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
        opacity .15s var(--n-bezier-ease-out),
        transform .15s var(--n-bezier-ease-out);
    `),
    c('&.popover-transition-leave-active', `
      transition:
        opacity .15s var(--n-bezier-ease-in),
        transform .15s var(--n-bezier-ease-in);
    `),
    cNotM('raw', `
      background-color: var(--n-color);
      border-radius: var(--n-border-radius);
    `, [
      cNotM('show-header', 'padding: var(--n-padding);')
    ]),
    cE('header', `
      padding: var(--n-padding);
      border-bottom: 1px solid var(--n-divider-color);
      transition: border-color .3s var(--n-bezier);
    `),
    cE('content', `
      padding: var(--n-padding);
    `),
    cB('popover-arrow-wrapper', `
      position: absolute;
      overflow: hidden;
      pointer-events: none;
    `, [
      cB('popover-arrow', `
        transition: background-color .3s var(--n-bezier);
        position: absolute;
        display: block;
        width: calc(var(--n-arrow-height) * 1.414);
        height: calc(var(--n-arrow-height) * 1.414);
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
        transform: rotate(45deg);
        background-color: var(--n-color);
        pointer-events: all;
      `)
    ])
  ]),
  placementStyle('top-start', `
    top: calc(-0.707 * var(--n-arrow-height));
    left: calc(var(--n-arrow-offset) - var(--v-offset-left));
  `),
  placementStyle('top', `
    top: calc(-0.707 * var(--n-arrow-height));
    transform: translateX(calc(-0.707 * var(--n-arrow-height))) rotate(45deg);
    left: 50%;
  `),
  placementStyle('top-end', `
    top: calc(-0.707 * var(--n-arrow-height));
    right: calc(var(--n-arrow-offset) + var(--v-offset-left));
  `),
  placementStyle('bottom-start', `
    bottom: calc(-0.707 * var(--n-arrow-height));
    left: calc(var(--n-arrow-offset) - var(--v-offset-left));
  `),
  placementStyle('bottom', `
    bottom: calc(-0.707 * var(--n-arrow-height));
    transform: translateX(calc(-0.707 * var(--n-arrow-height))) rotate(45deg);
    left: 50%;
  `),
  placementStyle('bottom-end', `
    bottom: calc(-0.707 * var(--n-arrow-height));
    right: calc(var(--n-arrow-offset) + var(--v-offset-left));
  `),
  placementStyle('left-start', `
    left: calc(-0.707 * var(--n-arrow-height));
    top: calc(var(--n-arrow-offset-vertical) - var(--v-offset-top));
  `),
  placementStyle('left', `
    left: calc(-0.707 * var(--n-arrow-height));
    transform: translateY(calc(-0.707 * var(--n-arrow-height))) rotate(45deg);
    top: 50%;
  `),
  placementStyle('left-end', `
    left: calc(-0.707 * var(--n-arrow-height));
    bottom: calc(var(--n-arrow-offset-vertical) + var(--v-offset-top));
    
  `),
  placementStyle('right-start', `
    right: calc(-0.707 * var(--n-arrow-height));
    top: calc(var(--n-arrow-offset-vertical) - var(--v-offset-top));
  `),
  placementStyle('right', `
    right: calc(-0.707 * var(--n-arrow-height));
    transform: translateY(calc(-0.707 * var(--n-arrow-height))) rotate(45deg);
    top: 50%;
  `),
  placementStyle('right-end', `
    right: calc(-0.707 * var(--n-arrow-height));
    bottom: calc(var(--n-arrow-offset-vertical) + var(--v-offset-top));
  `)
])

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
    cB('popover', `
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
