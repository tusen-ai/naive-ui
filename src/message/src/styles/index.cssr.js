import { c, cB, cE, cM } from '../../../_utils/cssr'
import iconSwitchTransition from '../../../_styles/transitions/icon-switch'

// vars:
// --bezier
// --padding
// --height
// --max-width
// --font-size
// --icon-margin
// --icon-size
// --close-size
// --close-margin
// --text-color
// --color
// --box-shadow
// --icon-color
// --close-color
// --close-color-pressed
// --close-color-hover
// --loading-color
export default c([
  cB('message', `
    display: flex;
    align-items: center;
    transition:
      color .3s var(--bezier),
      box-shadow .3s var(--bezier),
      background-color .3s var(--bezier),
      opacity .3s var(--bezier),
      transform .3s var(--bezier),
      max-height .3s var(--bezier),
      margin-bottom .3s var(--bezier);
    opacity: 1;
    margin-bottom: 12px;
    padding: var(--padding);
    height: var(--height);
    max-height: var(--height);
    border-radius: 20px;
    flex-shrink: 0;
    font-weight: 400;
    overflow: hidden;
    max-width: var(--max-width);
    color: var(--text-color);
    background-color: var(--color);
    box-shadow: var(--box-shadow);
  `, [
    cE('content', `
      display: inline-block;
      height: var(--height);
      line-height: var(--height);
      font-size: var(--font-size);
    `),
    cE('icon', `
      margin-right: var(--icon-margin);
      display: inline-flex;
      height: var(--height);
      line-height: var(--height);
      align-items: center;
      color: var(--icon-color);
      font-size: var(--icon-size);
      
    `, [
      cB('base-icon', [
        cB('base-loading', {
          color: 'var(--loading-color)'
        }, [
          iconSwitchTransition()
        ]),
        c('svg', [
          iconSwitchTransition()
        ])
      ])
    ]),
    cE('close', `
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--close-size);
      width: var(--close-size);
      border-radius: 100px;
      font-size: var(--close-size);
      margin: var(--close-margin);
    `, [
      cB('icon', {
        transition: 'color .3s var(--bezier)'
      })
    ]),
    cM('closable', {
      padding: 'var(--padding-closable)'
    }),
    cE('close', [
      cB('icon', `
        cursor: pointer;
        color: var(--close-color);
      `, [
        c('&:hover', {
          color: 'var(--close-color-hover)'
        }),
        c('&:active', {
          color: 'var(--close-color-pressed)'
        })
      ])
    ])
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
  `),
  // TODO: refactor transition style
  cB('message', [
    c('&.message-transition-enter-from, &.message-transition-leave-to', `
      opacity: 0;
      transform: translateY(-12px) scale(.5);
      transform-origin: top center;
      max-height: 0;
      margin-bottom: 0;
    `)
  ])
])
