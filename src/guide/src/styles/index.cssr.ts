import { fadeInTransition } from '../../../_styles/transitions/fade-in.cssr'
import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --n-bezier
// --n-mask-color
// --n-border-radius
// --n-color
// --n-divider-color
// --n-font-size
// --n-title-font-size
// --n-title-font-weight
// --n-text-color
// --n-title-text-color
// --n-box-shadow
// --n-padding
// --n-action-gap
export default c([
  cB('guide', `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
  `),
  cB('guide-mask', `
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: all;
  `, [
    fadeInTransition({
      enterDuration: '.2s',
      leaveDuration: '.2s',
      enterCubicBezier: 'var(--n-bezier)',
      leaveCubicBezier: 'var(--n-bezier)'
    })
  ]),
  cB('guide-popover', `
    pointer-events: all;
  `),
  cB('guide-panel', `
    width: 320px;
    max-width: calc(100vw - 32px);
    box-sizing: border-box;
    color: var(--n-text-color);
    font-size: var(--n-font-size);
    background-color: var(--n-color);
    border-radius: var(--n-border-radius);
    box-shadow: var(--n-box-shadow);
    overflow: hidden;
    transition:
      background-color .3s var(--n-bezier),
      color .3s var(--n-bezier),
      box-shadow .3s var(--n-bezier);
  `, [
    cE('title', `
      padding: var(--n-padding) var(--n-padding) 0;
      color: var(--n-title-text-color);
      font-size: var(--n-title-font-size);
      font-weight: var(--n-title-font-weight);
      line-height: 1.35;
      transition: color .3s var(--n-bezier);
    `),
    cE('content', `
      padding: 8px var(--n-padding) 0;
      line-height: 1.6;
    `),
    cE('footer', `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--n-action-gap);
      padding: var(--n-padding);
    `),
    cE('indicator', `
      color: var(--n-text-color);
      opacity: .72;
      white-space: nowrap;
      transition: color .3s var(--n-bezier);
    `),
    cE('actions', `
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--n-action-gap);
      flex-wrap: wrap;
    `, [
      c('>', [
        cB('button', `
          margin: 0;
        `)
      ])
    ])
  ])
])
