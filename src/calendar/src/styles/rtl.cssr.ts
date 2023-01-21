import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('calendar', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('calendar-header', [
      cE('extra', `
           direction: ltr;
      `)
    ])

  ])
])
