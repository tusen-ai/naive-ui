import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('list', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('list-item', [
      cE('prefix', `
        margin-right: 0;
        margin-left: 20px;
      `),
      cE('suffix', `
        margin-right: 20px;
        margin-left: 0;
      `)
    ])
  ])
])
