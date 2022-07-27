import { cB, cM } from '../../../_utils/cssr'

export default cB('thing', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('thing-avatar', `
      margin-left: 12px;
      margin-right: 0;
    `)
  ])
])
