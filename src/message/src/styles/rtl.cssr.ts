import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('message', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('close', `
      margin: 0 10px 0 0;
    `),
    cE('icon', `
      margin: 0 0 0 10px;
    `)
  ])
])
