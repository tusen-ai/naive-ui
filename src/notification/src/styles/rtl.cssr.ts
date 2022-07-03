import { cB, cM, cE, c } from '../../../_utils/cssr'

export default cB('notification', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('notification-main', `
      margin-left: unset;
      margin-right: 8px;
    `, [
      cE('header', `
        margin: var(--n-icon-margin);
        margin-right: 0;
      `)
    ]),
    cE('avatar', `
      left: unset;
      right: var(--n-padding-left);
    `),
    cM('show-avatar', [
      cB('notification-main', `
        margin-right: 40px;
        margin-reft: unset;
      `)
    ]),
    cM('closable', [
      cB('notification-main', [
        c('> *:first-child', `
          padding-left: 20px;
          padding-right: unset;
        `)
      ]),
      cE('close', `
        right: unset;
        left: 0;
      `)
    ])
  ])
])
