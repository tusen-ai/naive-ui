import { c, cB, cM, cE } from '../../../_utils/cssr'

export default c([
  cB('page-header-wrapper', [
    cM('rtl', [
      cB('page-header-header', `
        direction: rtl;
      `),
      cB('page-header', `
        direction: rtl;
      `, [
        cE('back', `
          margin-left: 16px;
          margin-right: 0;
        `),
        cE('avatar', `
          margin-left: 12px;
          margin-right: 0;
        `),
        cE('title', `
          margin-left: 16px;
          margin-right: 0;
        `)
      ]),
      cB('page-header-content', `
        direction: rtl;
      `),
      cB('page-header-footer', `
        direction: rtl;
      `)
    ])
  ])
])
