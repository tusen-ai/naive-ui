import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('tag', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('close', `
      margin: var(--n-close-margin-rtl);
    `),
    cE('icon', `
      margin: 0 0 0 4px;
    `),
    cE('avatar', `
      margin: 0 0 0 6px;
    `),
    cM('round', [
      cE('icon', `
        margin: 0 calc((var(--n-height) - 8px) / -2) 0 4px;
      `),
      cE('avatar', `
        margin: 0 calc((var(--n-height) - 8px) / -2) 0 6px;
      `),
      cM('closable', `
        padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 4);
      `)
    ]),
    cM('icon, avatar', [
      cM('round', `
        padding: 0 calc(var(--n-height) / 2) 0 calc(var(--n-height) / 3);
      `)
    ])
  ])
])
