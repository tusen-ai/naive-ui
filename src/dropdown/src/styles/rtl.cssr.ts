import { c, cB, cE, cM } from '../../../_utils/cssr'

export default cB('dropdown-menu', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('dropdown-offset-container', `
      direction: ltr;
      text-align: left;
    `),
    c('> .v-binder-follower-container', `
      direction: ltr;
      text-align: left;
    `),
    cB('dropdown-option-body', [
      cE('suffix', [
        cM('has-submenu', [
          cB('icon', `
            transform: rotate(180deg);
          `)
        ])
      ])
    ])
  ])
])
