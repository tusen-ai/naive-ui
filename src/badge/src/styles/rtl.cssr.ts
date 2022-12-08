import { cB, cM } from '../../../_utils/cssr'

export default cB('badge', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('badge-sup', `
      transform: translate(-50%, -50%);
      direction: initial;
    `)
  ])
])
