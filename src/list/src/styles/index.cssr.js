import { cB, c, cE, cM, insideModal } from '../../../_utils/cssr'

// vars:
// --font-size
// --bezier
// --text-color
// --color
// --border-radius
// --border-color
// --color-modal
export default c([
  cB('list', `
    font-size: var(--font-size);
    transition:
      background-color .3s var(--bezier),
      color .3s var(--bezier),
      border-color .3s var(--bezier);
    padding: 0;
    list-style-type: none;
    color: var(--text-color);
  `, [
    cM('bordered', `
      background-color: var(--color);
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
    `, [
      cB('list-item', `
        padding: 12px 20px;
      `, [
        c('&:not(:last-child)', `
          border-bottom: 1px solid var(--border-color);
        `)
      ]),
      cE('header, footer', `
        padding: 12px 20px;
      `, [
        c('&:not(:last-child)', `
          border-bottom: 1px solid var(--border-color);
        `)
      ])
    ]),
    cE('header, footer', `
      padding: 12px 0;
      box-sizing: border-box;
      transition: border-color .3s var(--bezier);
    `, [
      c('&:not(:last-child)', `
        border-bottom: 1px solid var(--border-color);
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
        border-bottom: 1px solid var(--border-color);
      `)
    ])
  ]),
  insideModal(
    cB('list', [
      cM('bordered', `
        background-color: var(--color-modal);
      `)
    ])
  )
])
