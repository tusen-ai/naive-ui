import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('anchor', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('anchor-rail', `
      right: 0;
      left: unset;
    `),
    cB('anchor-link', `
      padding: 0 16px 0 0;
    `, [
      cE('title', `
      padding-right: 0;
      padding-left: 16px
    `)
    ])
  ])
])
