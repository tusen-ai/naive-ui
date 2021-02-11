import { c, cB, cE, cM } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'
import fadeInHeightExpand from '../../../_styles/transitions/fade-in-height-expand'

// vars:
// --margin
// --bezier
// --padding
// --max-width
// --font-size
// --icon-margin
// --icon-size
// --close-size
// --close-margin
// --text-color
// --color
// --box-shadow
// --icon-color-info
// --icon-color-success
// --icon-color-warning
// --icon-color-error
// --icon-color-loading
// --close-color
// --close-color-pressed
// --close-color-hover
// --border-radius
export default c([
  cB('message-wrapper', `
    margin: var(--margin);
    z-index: 0;
    transform-origin: top center;
  `, [
    fadeInHeightExpand({
      overflow: 'visible',
      originalTransition: 'transform .3s var(--bezier)',
      enterToProps: {
        transform: 'scale(1)'
      },
      leaveToProps: {
        transform: 'scale(0.85)'
      }
    })
  ]),
  cB('message', `
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition:
      color .3s var(--bezier),
      box-shadow .3s var(--bezier),
      background-color .3s var(--bezier),
      opacity .3s var(--bezier),
      transform .3s var(--bezier),
      margin-bottom .3s var(--bezier);
    padding: var(--padding);
    border-radius: var(--border-radius);
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: var(--max-width);
    color: var(--text-color);
    background-color: var(--color);
    box-shadow: var(--box-shadow);
  `, [
    cE('content', `
      display: inline-block;
      line-height: var(--line-height);
      font-size: var(--font-size);
    `),
    cE('icon', `
      position: relative;
      margin: var(--icon-margin);
      height: var(--icon-size);
      width: var(--icon-size);
      font-size: var(--icon-size);
      flex-shrink: 0;
    `, [
      ['info', 'success', 'warning', 'error', 'loading'].map((type) =>
        cM(`${type}-type`, [
          c('> *', `
            color: var(--icon-color-${type});
            transition: color .3s var(--bezier);
          `)
        ])
      ),
      c('> *', {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      [iconSwitchTransition()])
    ]),
    cE('close', `
      font-size: var(--close-size);
      margin: var(--close-margin);
      transition: color .3s var(--bezier);
      flex-shrink: 0;
    `)
  ]),
  cB('message-container', `
    z-index: 6000;
    position: fixed;
    top: 12px;
    left: 0;
    right: 0;
    height: 0;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
  `)
])
