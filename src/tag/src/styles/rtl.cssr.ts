import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('tag', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('close', `
      margin: var(--close-margin-rtl)
    `)
  ])
])
