import { c, cB, cE, cM } from '../../../_utils/cssr'
import slideInFromRightTransition from '../../../_styles/transitions/slide-in-from-right'
import slideInFromLeftTransition from '../../../_styles/transitions/slide-in-from-left'
import slideInFromTopTransition from '../../../_styles/transitions/slide-in-from-top'
import slideInFromBottomTransition from '../../../_styles/transitions/slide-in-from-bottom'
import fadeInTransition from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --n-line-height
// --n-color
// --n-text-color
// --n-box-shadow
// --n-bezier
// --n-bezier-out
// --n-bezier-in
// --n-body-padding
// --n-header-padding
// --n-footer-padding
// --n-title-font-size
// --n-title-text-color
// --n-title-font-weight
// --n-header-border-bottom
// --n-footer-border-top
// --n-close-color
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-size
export default c([
  cB('drawer', `
    line-height: var(--n-line-height);
    position: absolute;
    pointer-events: all;
    box-shadow: var(--n-box-shadow);
    transition:
      background-color .3s var(--n-bezier),
      color .3s var(--n-bezier);
    background-color: var(--n-color);
    color: var(--n-text-color);
    box-sizing: border-box;
  `,
  [
    slideInFromRightTransition(),
    slideInFromLeftTransition(),
    slideInFromTopTransition(),
    slideInFromBottomTransition(),
    cM('native-scrollbar', [
      cB('drawer-content-wrapper', `
        overflow: auto;
        height: 100%;
      `)
    ]),
    cB('drawer-content-wrapper', `
      box-sizing: border-box;
    `),
    cB('drawer-content', `
      height: 100%;
      display: flex;
      flex-direction: column;
    `, [
      cM('native-scrollbar', [
        cB('drawer-body-content-wrapper', `
          height: 100%;
          overflow: auto;
        `)
      ]),
      cB('drawer-body', `
        flex: 1 0 0;
        overflow: hidden;
      `),
      cB('drawer-body-content-wrapper', `
        box-sizing: border-box;
        padding: var(--n-body-padding);
      `),
      cB('drawer-header', `
        font-weight: var(--n-title-font-weight);
        line-height: 1;
        font-size: var(--n-title-font-size);
        color: var(--n-title-text-color);
        padding: var(--n-header-padding);
        transition: border .3s var(--n-bezier);
        border-bottom: 1px solid var(--n-divider-color);
        border-bottom: var(--n-header-border-bottom);
        display: flex;
        justify-content: space-between;
        align-items: center;
      `, [
        cE('close', `
          transition: color .3s var(--n-bezier);
          font-size: var(--n-close-size);
        `)
      ]),
      cB('drawer-footer', `
        display: flex;
        justify-content: flex-end;
        border-top: var(--n-footer-border-top);
        transition: border .3s var(--n-bezier);
        padding: var(--n-footer-padding);
      `)
    ]),
    cM('right-placement', `
      top: 0;
      bottom: 0;
      right: 0;
    `),
    cM('left-placement', `
      top: 0;
      bottom: 0;
      left: 0;
    `),
    cM('top-placement', `
      top: 0;
      left: 0;
      right: 0;
    `),
    cM('bottom-placement', `
      left: 0;
      bottom: 0;
      right: 0;
    `)
  ]),
  c('body', [
    c('>', [
      cB('drawer-container', {
        position: 'fixed'
      })
    ])
  ]),
  cB('drawer-container', `
    position: relative;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
  `, [
    c('> *', {
      pointerEvents: 'all'
    })
  ]),
  cB('drawer-mask', `
    background-color: rgba(0, 0, 0, .3);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  `, [
    fadeInTransition({
      enterDuration: '0.2s',
      leaveDuration: '0.2s',
      enterCubicBezier: 'var(--n-bezier-in)',
      leaveCubicBezier: 'var(--n-bezier-out)'
    })
  ])
])
