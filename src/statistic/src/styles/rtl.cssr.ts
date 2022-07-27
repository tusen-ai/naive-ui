import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('statistic', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('statistic-value', [
      cE('prefix', `
        margin: 0 0 0 4px;
      `),
      cE('suffix', `
        margin: 0 4px 0 0;
      `)
    ])
  ])
])
