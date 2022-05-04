import { c, cB, cM, cNotM } from '../../../_utils/cssr'

export default cB('avatar-group', [
  cM('rtl', `
    direction: rtl;
  `, [
    cNotM('vertical', `
      flex-direction: row;
    `, [
      cB('avatar', [
        c('&:not(:first-child)', `
          margin-right: -12px;
          margin-left: 0;
        `)
      ])
    ])
  ])
])
