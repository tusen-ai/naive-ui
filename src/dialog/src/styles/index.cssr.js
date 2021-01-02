import { c, cB, cE, cM, insideModal } from '../../../_utils/cssr'

// vars:
// --icon-color
// --bezier
// --close-margin
// --icon-margin
// --icon-size
// --close-size
// --close-color
// --close-color-hover
// --close-color-pressed
// --color
// --text-color
// --border-radius
// --padding
// --line-height
// --border
// --content-margin
// --title-font-size
// --title-font-weight
// --title-text-color
// --action-space
export default c([
  cB(
    'dialog', `
      line-height: var(--line-height);
      position: relative;
      background: var(--color);
      color: var(--text-color);
      box-sizing: border-box;
      margin: auto;
      border-radius: var(--border-radius);
      padding: var(--padding);
      transition: 
        border-color .3s var(--bezier),
        background-color .3s var(--bezier),
        color .3s var(--bezier);
    `,
    [
      cE('icon', {
        color: 'var(--icon-color)'
      }),
      cM('bordered', {
        border: 'var(--border)'
      }),
      cM('icon-top', [
        cE('close', {
          margin: 'var(--close-margin)'
        }),
        cE('icon', {
          margin: 'var(--icon-margin)'
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
          margin: 'var(--icon-margin)'
        })
      ]),
      cE('close', `
        font-size: var(--close-size);
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        color: var(--close-color);
        margin: var(--close-margin);
        transition: .3s color var(--bezier);
      `,
      [
        c('&:hover', {
          color: 'var(--close-color-hover)'
        }),
        c('&:active', {
          color: 'var(--close-color-pressed)'
        })
      ]),
      cE('content', `
        font-size: var(--font-size);
        margin: var(--content-margin);
        position: relative;
      `),
      cE('action', `
        display: flex;
        justify-content: flex-end;
      `, [
        c('> *:not(:last-child)', {
          marginRight: 'var(--action-space)'
        })
      ]),
      cE('icon', {
        fontSize: 'var(--icon-size)',
        transition: 'color .3s var(--bezier)'
      }),
      cE('title', `
        transition: color .3s var(--bezier);
        display: flex;
        align-items: center;
        font-size: var(--title-font-size);
        font-weight: var(--title-font-weight);
        color: var(--title-text-color);
      `),
      cB('dialog-icon-container', {
        display: 'flex',
        justifyContent: 'center'
      })
    ]
  ),
  insideModal(
    cB('dialog', `
      width: 446px;
      max-width: calc(100vw - 32px);
    `)
  )
])
