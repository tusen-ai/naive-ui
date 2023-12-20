import { cB, cM } from '../../../../_utils/cssr'

export default cB('base-select-menu', [
  cM('rtl', [
    cB('scrollbar', `
      direction: rtl;
    `)
  ])
])
