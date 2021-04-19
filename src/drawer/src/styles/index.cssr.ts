import { c, cB, cM } from '../../../_utils/cssr'
import slideInFromRightTransition from '../../../_styles/transitions/slide-in-from-right'
import slideInFromLeftTransition from '../../../_styles/transitions/slide-in-from-left'
import slideInFromTopTransition from '../../../_styles/transitions/slide-in-from-top'
import slideInFromBottomTransition from '../../../_styles/transitions/slide-in-from-bottom'
import fadeInTransition from '../../../_styles/transitions/fade-in.cssr'

// vars:
// --line-height
// --color
// --text-color
// --box-shadow
// --bezier
// --bezier-out
// --bezier-in
// --body-padding
// --header-padding
// --footer-padding
// --title-font-size
// --title-text-color
// --title-font-weight
// --header-border-bottom
// --footer-border-top
export default c([
  cB('drawer', `
    line-height: var(--line-height);
    position: absolute;
    pointer-events: all;
    box-shadow: var(--box-shadow);
    transition:
      background-color .3s var(--bezier),
      color .3s var(--bezier);
    background-color: var(--color);
    color: var(--text-color);
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
      `),
      cB('drawer-body-content-wrapper', `
        box-sizing: border-box;
        padding: var(--body-padding);
      `),
      cB('drawer-header', `
        font-weight: var(--title-font-weight);
        line-height: 1;
        font-size: var(--title-font-size);
        color: var(--title-text-color);
        padding: var(--header-padding);
        border-bottom: 1px solid var(--divider-color);
        border-bottom: var(--header-border-bottom);
      `),
      cB('drawer-footer', `
        display: flex;
        justify-content: flex-end;
        border-top: var(--footer-border-top);
        padding: var(--footer-padding);
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
      enterCubicBezier: 'var(--bezier-in)',
      leaveCubicBezier: 'var(--bezier-out)'
    })
  ])
])
