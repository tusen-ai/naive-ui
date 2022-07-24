import { c, cB, cM, cE } from '../../../_utils/cssr'

export default cB('card', [
  cM('rtl', `
    direction: rtl;
  `),
  c('>', [
    cB('card-header', [
      c('>', [
        cE('close', `
          margin: 0 8px 0 0;
        `)
      ])
    ])
  ])
])
