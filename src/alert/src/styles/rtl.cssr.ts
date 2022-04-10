import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('alert', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('icon', `
      left: unset;
      right: 0;
      margin: var(--n-icon-margin-rtl);
    `),
    cM('show-icon', [
      cB('alert-body', {
        paddingLeft: 'var(--n-padding)',
        paddingRight: 'calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))'
      })
    ]),
    cE('close', `
      position: absolute;
      right: unset;
      left: 0;
      margin: var(--n-close-margin-rtl);
    `)
  ])
])
