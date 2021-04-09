import { cB, c, cE, cM, insideModal, insidePopover } from '../../../_utils/cssr'

// vars:
// --font-size
// --bezier
// --text-color
// --color
// --border-radius
// --border-color
// --border-color-modal
// --border-color-popover
// --color-modal
// --color-popover
export default c([
  cB('list', `
    --merged-border-color: var(--border-color);
    --merged-color: var(--color)
    font-size: var(--font-size);
    transition:
      background-color .3s var(--bezier),
      color .3s var(--bezier),
      border-color .3s var(--bezier);
    padding: 0;
    list-style-type: none;
    color: var(--text-color);
    background-color: var(--merged-color);
  `, [
    cM('bordered', `
      border-radius: var(--border-radius);
      border: 1px solid var(--merged-border-color);
    `, [
      cB('list-item', `
        padding: 12px 20px;
      `, [
        c('&:not(:last-child)', `
          border-bottom: 1px solid var(--merged-border-color);
        `)
      ]),
      cE('header, footer', `
        padding: 12px 20px;
      `, [
        c('&:not(:last-child)', `
          border-bottom: 1px solid var(--merged-border-color);
        `)
      ])
    ]),
    cE('header, footer', `
      padding: 12px 0;
      box-sizing: border-box;
      transition: border-color .3s var(--bezier);
    `, [
      c('&:not(:last-child)', `
        border-bottom: 1px solid var(--merged-border-color);
      `)
    ]),
    cB('list-item', `
      padding: 12px 0;    
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      transition: border-color .3s var(--bezier);
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
        border-bottom: 1px solid var(--merged-border-color);
      `)
    ])
  ]),
  insideModal(
    cB('list', `
    --merged-color: var(--color-modal);
      --merged-border-color: var(--border-color-modal);
    `)
  ),
  insidePopover(
    cB('list', `
      --merged-color: var(--color-popover);
      --merged-border-color: var(--border-color-popover);
    `)
  )
])
