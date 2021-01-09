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
// --close-color
// --close-color-hover
// --close-color-pressed
// --line-height
// --icon-color
export default c([
  cB('notification-container', `
    z-index: 4000;
    position: fixed;
    top: 12px;
    left: 0;
    right: 0;
    height: 0;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `, [
    c('>', [
      cB('scrollbar', `
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
    cM('scrollable', {
      top: 0
    }),
    cB('notification', [
      c('&-transition-enter-from, &-transition-leave-to', `
        opacity: 0;
        margin-bottom: 0 !important;
        transform: translateX(calc(100% + 16px));
      `),
      c('&-transition-leave-from, &-transition-enter-to', `
        opacity: 1;
        transform: translateX(0);
      `),
      c('&-transition-leave-active', `
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
      padding-left: 16px;
      padding-right: 16px;
      width: 365px;
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
          top: 16px;
          right: 12px;
          font-size: 14px;
          transition: color .3s var(--bezier);
        `)
      ]),
      cE('avatar', `
        position: absolute;
        top: 16px;
        left: 16px;
        width: 28px;
        height: 28px;
        font-size: 28px;
      `, [
        cB('icon', {
          transition: 'color .3s var(--bezier)'
        })
      ]),
      cB('notification-main', `
        padding-top: 16px;
        padding-bottom: 16px;
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
