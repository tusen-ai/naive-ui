import { c, cB, cE, cM } from '../../../_utils/cssr'

export default cB('dynamic-input', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('dynamic-input-preset-pair', [
      cB('dynamic-input-pair-input', [
        c('&:first-child', {
          'margin-left': '12px',
          'margin-right': '0'
        })
      ])
    ]),
    cB('dynamic-input-item', [
      cE('action', `
        margin: var(--action-margin-rtl);
      `)
    ])
  ])
])
