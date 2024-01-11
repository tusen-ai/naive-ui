import { cB, cE, cM } from '../../../../_utils/cssr'

export default cB('base-select-menu', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('base-select-option', [
      cE('check', `
        right: unset;
        left: calc(var(--n-option-padding-right) - 4px);
      `),
      cM('show-checkmark', `
        padding-left: calc(var(--n-option-padding-right) + 20px);
        padding-right: var(--n-option-padding-left);
      `)
    ])
  ])
])
