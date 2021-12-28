import { cB, c, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --n-font-size
// --n-bezier
// --n-text-color
// --n-color
// --n-border-radius
// --n-border-color
// --n-border-color-modal
// --n-border-color-popover
// --n-color-modal
// --n-color-popover
export default c([
  cB('list', `
    --n-merged-border-color: var(--n-border-color);
    --n-merged-color: var(--n-color)
    font-size: var(--n-font-size);
    transition:
      background-color .3s var(--n-bezier),
      color .3s var(--n-bezier),
      border-color .3s var(--n-bezier);
    padding: 0;
    list-style-type: none;
    color: var(--n-text-color);
    background-color: var(--n-merged-color);
  `, [
    cM('bordered', `
      border-radius: var(--n-border-radius);
      border: 1px solid var(--n-merged-border-color);
    `, [
      cB('list-item', `
        padding: 12px 20px;
      `, [
        c('&:not(:last-child)', `
          border-bottom: 1px solid var(--n-merged-border-color);
        `)
      ]),
      cE('header, footer', `
        padding: 12px 20px;
      `, [
        c('&:not(:last-child)', `
          border-bottom: 1px solid var(--n-merged-border-color);
        `)
      ])
    ]),
    cE('header, footer', `
      padding: 12px 0;
      box-sizing: border-box;
      transition: border-color .3s var(--n-bezier);
    `, [
      c('&:not(:last-child)', `
        border-bottom: 1px solid var(--n-merged-border-color);
      `)
    ]),
    cB('list-item', `
      padding: 12px 0;    
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      transition: border-color .3s var(--n-bezier);
    `, [
      cE('prefix', `
        margin-right: 20px;
        flex: 0;
      `),
      cE('suffix', `
          margin-left: 20px;
          flex: 0;
        `),
      cE('main', `
        flex: 1;
      `),
      c('&:not(:last-child)', `
        border-bottom: 1px solid var(--n-merged-border-color);
      `)
    ])
  ]),
  insideModal(
    cB('list', `
    --merged-color: var(--n-color-modal);
      --merged-border-color: var(--n-border-color-modal);
    `)
  ),
  insidePopover(
    cB('list', `
      --merged-color: var(--n-color-popover);
      --merged-border-color: var(--n-border-color-popover);
    `)
  )
])
