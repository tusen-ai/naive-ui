import { CNode } from 'css-render'
import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --color
// --text-color
// --description-text-color
// --action-text-color
// --title-text-color
// --title-font-weight
// --bezier
// --bezier-ease-out
// --bezier-ease-in
// --border-radius
// --box-shadow
// --close-margin
// --close-size
// --close-color
// --close-color-hover
// --close-color-pressed
// --line-height
// --icon-color
// --width
// --padding-top
// --padding-bottom
// --padding-left
// --padding-right
export default c([
  cB('notification-container', `
    z-index: 4000;
    position: fixed;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `, [
    c('>', [
      cB('scrollbar', `
        width: initial;
        overflow: visible;
        height: -moz-fit-content !important;
        height: fit-content !important;
        max-height: 100vh !important;
      `, [
        c('>', [
          cB('scrollbar-container', `
            height: -moz-fit-content !important;
            height: fit-content !important;
            max-height: 100vh !important;
          `, [
            cB('scrollbar-content', `
              padding-top: 12px;
              padding-bottom: 33px;
            `)
          ])
        ])
      ])
    ]),
    cM('top-right', `
      right: 0;
      top: 12px;
    `, [
      placementTransformStyle('top-right')
    ]),
    cM('top-left', `
      left: 0;
      top: 12px;
    `, [
      placementTransformStyle('top-left')
    ]),
    cM('bottom-right', `
      right: 0;
      bottom: 12px;
    `, [
      placementTransformStyle('bottom-right')
    ]),
    cM('bottom-left', `
      left: 0;
      bottom: 12px;
    `, [
      placementTransformStyle('bottom-left')
    ]),
    cM('scrollable', [
      cM('top-right', `
        top: 0;
      `),
      cM('top-left', `
        top: 0;
      `),
      cM('bottom-right', `
        bottom: 0;
      `),
      cM('bottom-left', `
        bottom: 0;
      `)
    ]),
    cB('notification', [
      c('&.notification-transition-enter-from, &.notification-transition-leave-to', `
        opacity: 0;
        margin-bottom: 0 !important;
      `),
      c('&.notification-transition-leave-from, &.notification-transition-enter-to', `
        opacity: 1;
      `),
      c('&.notification-transition-leave-active', `
        transition:
          background-color .3s var(--bezier),
          color .3s var(--bezier),
          opacity .3s var(--bezier),
          transform .3s var(--bezier-ease-in),
          max-height .3s var(--bezier),
          margin-bottom .3s linear,
          box-shadow .3s var(--bezier);
      `)
    ]),
    cB('notification', `
      background-color: var(--color);
      color: var(--text-color);
      transition:
        background-color .3s var(--bezier),
        color .3s var(--bezier),
        opacity .3s var(--bezier),
        transform .3s var(--bezier-ease-out),
        max-height .3s var(--bezier),
        margin-bottom .3s linear,
        box-shadow .3s var(--bezier);
      font-family: inherit;
      font-size: var(--font-size);
      font-weight: 400;
      position: relative;
      display: flex;
      overflow: hidden;
      flex-shrink: 0;
      margin-bottom: 12px;
      margin-left: 28px;
      margin-right: 16px;
      padding-left: var(--padding-left);
      padding-right: var(--padding-right);
      width: var(--width);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      box-sizing: border-box;
      opacity: 1;
    `, [
      // TODO: refactor type styles & transition
      cE('avatar', [
        cB('icon', {
          color: 'var(--icon-color)'
        }),
        cB('base-icon', {
          color: 'var(--icon-color)'
        })
      ]),
      cM('show-avatar', [
        cB('notification-main', `
          margin-left: 40px;
          width: calc(100% - 40px);  
        `)
      ]),
      cM('closable', [
        cB('notification-main', [
          c('> *:first-child', {
            paddingRight: '20px'
          })
        ]),
        cE('close', `
          position: absolute;
          top: 0;
          right: 0;
          margin: var(--close-margin);
          font-size: var(--close-size);
          transition: color .3s var(--bezier);
        `)
      ]),
      cE('avatar', `
        position: absolute;
        top: var(--padding-top);
        left: var(--padding-left);
        width: 28px;
        height: 28px;
        font-size: 28px;
      `, [
        cB('icon', {
          transition: 'color .3s var(--bezier)'
        })
      ]),
      cB('notification-main', `
        padding-top: var(--padding-top);
        padding-bottom: var(--padding-bottom);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        width: calc(100% - 8px);
      `, [
        cB('notification-main-footer', `
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        `, [
          cE('meta', `
            font-size: 12px;
            transition: color .3s var(--bezier-ease-out);
            color: var(--description-text-color);
          `),
          cE('action', `
            cursor: pointer;
            transition: color .3s var(--bezier-ease-out);
            color: var(--action-text-color);
          `)
        ]),
        cE('header', `
          font-weight: var(--title-font-weight);
          font-size: 16px;
          transition: color .3s var(--bezier-ease-out);
          color: var(--title-text-color);
        `),
        cE('description', `
          margin-top: 8px;
          font-size: 12px;
          transition: color .3s var(--bezier-ease-out);
          color: var(--description-text-color);
        `),
        cE('content', `
          line-height: var(--line-height);
          margin: 12px 0 0 0;
          font-family: inherit;
          white-space: pre-wrap;
          word-wrap: break-word;
          transition: color .3s var(--bezier-ease-out);
          color: var(--text-color);
        `, [
          c('&:first-child', {
            margin: 0
          })
        ])
      ])
    ])
  ])
])

function placementTransformStyle (placement: string): CNode {
  const [position, direction] = placement.split('-')
  const transformYEnter = position === 'top' ? '-100%' : '100%'
  const transformYLeave = position === 'top' ? '0' : '0'
  const transformXEnter = direction === 'left' ? 'calc(-100%)' : 'calc(100%)'
  const transformXLeave = '0'
  return cB('notification', [
    c('&.notification-transition-enter-from, &.notification-transition-leave-to', `
      transform: translate(${transformXEnter}, ${transformYEnter});
    `),
    c('&.notification-transition-leave-from, &.notification-transition-enter-to', `
      transform: translate(${transformXLeave}, ${transformYLeave});
    `)
  ])
}
