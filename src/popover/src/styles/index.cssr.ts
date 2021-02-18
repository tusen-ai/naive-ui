import { CNode } from 'css-render'
import { FollowerPlacement } from 'vueuc'
import { c, cB, cM, cNotM } from '../../../_utils/cssr'

const oppositePlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left'
}

// vars:
// --bezier
// --bezier-ease-in
// --bezier-ease-out
// --font-size
// --text-color
// --color
// --border-radius
// --arrow-height
// --arrow-offset
// --arrow-offset-vertical
// --padding
// --space
// --space-arrow
export default c([
  cB('popover', `
    transition:
      background-color .3s var(--bezier),
      color .3s var(--bezier);
    transform-origin: inherit;
    position: relative;
    font-size: var(--font-size);
    color: var(--text-color);
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
        opacity .15s var(--bezier-ease-out),
        transform .15s var(--bezier-ease-out);
    `),
    c('&.popover-transition-leave-active', `
      transition:
        opacity .15s var(--bezier-ease-in),
        transform .15s var(--bezier-ease-in);
    `),
    cNotM('raw', `
      background-color: var(--color);
      border-radius: var(--border-radius);
    `, [
      cM('padded', {
        padding: 'var(--padding)'
      })
    ]),
    cB('popover-arrow-wrapper', `
      position: absolute;
      overflow: hidden;
      pointer-events: none;
    `, [
      cB('popover-arrow', `
        transition: background-color .3s var(--bezier);
        position: absolute;
        display: block;
        width: calc(var(--arrow-height) * 1.414);
        height: calc(var(--arrow-height) * 1.414);
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
        transform: rotate(45deg);
        background-color: var(--color);
        pointer-events: all;
      `)
    ]),
    cM('shadow', {
      boxShadow: 'var(--box-shadow)'
    })
  ]),
  placementStyle('top-start', `
    top: calc(-0.707 * var(--arrow-height));
    left: var(--arrow-offset);
  `),
  placementStyle('top', `
    top: calc(-0.707 * var(--arrow-height));
    transform: translateX(calc(-0.707 * var(--arrow-height))) rotate(45deg);
    left: 50%;
  `),
  placementStyle('top-end', `
    top: calc(-0.707 * var(--arrow-height));
    right: var(--arrow-offset);
  `),
  placementStyle('bottom-start', `
    bottom: calc(-0.707 * var(--arrow-height));
    left: var(--arrow-offset);
  `),
  placementStyle('bottom', `
    bottom: calc(-0.707 * var(--arrow-height));
    transform: translateX(calc(-0.707 * var(--arrow-height))) rotate(45deg);
    left: 50%;
  `),
  placementStyle('bottom-end', `
    bottom: calc(-0.707 * var(--arrow-height));
    right: var(--arrow-offset);
  `),
  placementStyle('left-start', `
    left: calc(-0.707 * var(--arrow-height));
    top: var(--arrow-offset-vertical);
  `),
  placementStyle('left', `
    left: calc(-0.707 * var(--arrow-height));
    transform: translateY(calc(-0.707 * var(--arrow-height))) rotate(45deg);
    top: 50%;
  `),
  placementStyle('left-end', `
    left: calc(-0.707 * var(--arrow-height));
    bottom: var(--arrow-offset-vertical);
  `),
  placementStyle('right-start', `
    right: calc(-0.707 * var(--arrow-height));
    top: var(--arrow-offset-vertical);
  `),
  placementStyle('right', `
    right: calc(-0.707 * var(--arrow-height));
    transform: translateY(calc(-0.707 * var(--arrow-height))) rotate(45deg);
    top: 50%;
  `),
  placementStyle('right-end', `
    right: calc(-0.707 * var(--arrow-height));
    bottom: var(--arrow-offset-vertical);
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
    ? 'height: var(--space-arrow);'
    : 'width: var(--space-arrow);'
  return c(`[v-placement="${placement}"]`, [
    cB('popover', `
      margin-${oppositePlacement[position]}: var(--space-arrow);
    `, [
      cM('no-arrow', `
        margin-${position}: var(--space);
        margin-${oppositePlacement[position]}: var(--space);
      `),
      cM('overlap', `
        margin: 0;
      `),
      cB('popover-arrow-wrapper', `
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
