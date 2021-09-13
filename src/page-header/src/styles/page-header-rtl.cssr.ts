import { c, cB, cM } from '../../../_utils/cssr'

export default c([
  cB('page-header-wrapper', [
    cM('rtl', [
      cB('page-header-header', `
        direction: rtl;
      `),
      cB('page-header', `
        direction: rtl;
      `),
      cB('page-header-content', `
        direction: rtl;
      `),
      cB('page-header-footer', `
        direction: rtl;
      `)
    ])
  ])
])
