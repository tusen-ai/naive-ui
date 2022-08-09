import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('drawer', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('drawer-content', [
      cB('drawer-header', [
        cE('close', `
          margin-left: 0;
          margin-right: 6px;
        `)
      ])
    ])
  ])
])
