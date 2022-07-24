import { asModal, c, cB, cE, cM, insideModal } from '../../../_utils/cssr'

// vars:
// --n-icon-color
// --n-bezier
// --n-icon-margin
// --n-icon-size
// --n-close-border-radius
// --n-close-margin
// --n-close-size
// --n-close-color-hover
// --n-close-color-pressed
// --n-close-icon-color
// --n-close-icon-color-hover
// --n-close-icon-color-pressed
// --n-color
// --n-text-color
// --n-border-radius
// --n-padding
// --n-line-height
// --n-border
// --n-content-margin
// --n-title-font-size
// --n-title-font-weight
// --n-title-text-color
// --n-action-space
export default c([
  cB('dialog', `
    word-break: break-word;
    line-height: var(--n-line-height);
    position: relative;
    background: var(--n-color);
    color: var(--n-text-color);
    box-sizing: border-box;
    margin: auto;
    border-radius: var(--n-border-radius);
    padding: var(--n-padding);
    transition: 
      border-color .3s var(--n-bezier),
      background-color .3s var(--n-bezier),
      color .3s var(--n-bezier);
  `, [
    cE('icon', {
      color: 'var(--n-icon-color)'
    }),
    cM('bordered', {
      border: 'var(--n-border)'
    }),
    cM('icon-top', [
      cE('close', {
        margin: 'var(--n-close-margin)'
      }),
      cE('icon', {
        margin: 'var(--n-icon-margin)'
      }),
      cE('content', {
        textAlign: 'center'
      }),
      cE('title', {
        justifyContent: 'center'
      }),
      cE('action', {
        justifyContent: 'center'
      })
    ]),
    cM('icon-left', [
      cE('icon', {
        margin: 'var(--n-icon-margin)'
      }),
      cM('closable', [
        cE('title', `
          padding-right: calc(var(--n-close-size) + 6px);
        `)
      ])
    ]),
    cE('close', `
      position: absolute;
      right: 0;
      top: 0;
      margin: var(--n-close-margin);
      transition:
        background-color .3s var(--n-bezier),
        color .3s var(--n-bezier);
      z-index: 1;
    `),
    cE('content', `
      font-size: var(--n-font-size);
      margin: var(--n-content-margin);
      position: relative;
      word-break: break-word;
    `, [
      cM('last', 'margin-bottom: 0;')
    ]),
    cE('action', `
      display: flex;
      justify-content: flex-end;
    `, [
      c('> *:not(:last-child)', {
        marginRight: 'var(--n-action-space)'
      })
    ]),
    cE('icon', {
      fontSize: 'var(--n-icon-size)',
      transition: 'color .3s var(--n-bezier)'
    }),
    cE('title', `
      transition: color .3s var(--n-bezier);
      display: flex;
      align-items: center;
      font-size: var(--n-title-font-size);
      font-weight: var(--n-title-font-weight);
      color: var(--n-title-text-color);
    `),
    cB('dialog-icon-container', {
      display: 'flex',
      justifyContent: 'center'
    })
  ]),
  insideModal(
    cB('dialog', `
      width: 446px;
      max-width: calc(100vw - 32px);
    `)
  ),
  cB('dialog', [
    asModal(`
      width: 446px;
      max-width: calc(100vw - 32px);
    `)
  ])
])
