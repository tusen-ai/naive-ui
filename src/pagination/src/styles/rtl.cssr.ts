import { c, cB, cM } from '../../../_utils/cssr'

export default cB('pagination', [
  cM('rtl', `
    direction: rtl;
  `, [
    c('> *:not(:first-child)', `
      margin: var(--n-item-margin-rtl);
    `),
    cB('pagination-quick-jumper', [
      cB('input', `
        margin: var(--n-input-margin-rtl);
      `)
    ])
  ])
])
