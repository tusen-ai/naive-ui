import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('page-header-wrapper', [
  cM('rtl', [
    cB('page-header-header', `
      direction: rtl;
    `),
    cB('page-header', `
      direction: rtl;
    `, [
      cE('back', `
        margin-right: 0;
        margin-left: 16px;
      `),
      cE('avatar', `
        margin-right: 0;
        margin-left: 12px;
      `),
      cE('title', `
        margin-right: 0;
        margin-left: 16px;
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
