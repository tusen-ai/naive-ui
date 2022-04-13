import { c, cB, cM } from '../../../_utils/cssr'

export default c([
  cB('table', [
    cM('rtl', `
      direction: rtl;
      text-align: right;
    `, [
      c('th', `
        border-right: none;
        border-left: 1px solid var(--n-merged-border-color);
      `, [
        c('&:last-child', `
          border-left: none;
          border-right: inherit;
        `)
      ]),
      c('td', `
        border-right: none;
        border-left: 1px solid var(--n-merged-border-color);
      `, [
        c('&:last-child', `
          border-left: none;
          border-right: inherit;
        `)
      ])
    ])
  ])
])
