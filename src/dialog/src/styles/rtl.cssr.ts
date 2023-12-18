import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('dialog', [
  cM('rtl', `
  direction: rtl;
  `, [
    cE('close', `
    right: unset;
    left: 0;
    margin-left: 1.8rem;
    `),
    cE('action', `
        direction: ltr;
        display: flex;
        justify-content: flex-start;
      `),
    cM('icon-left', [
      cE('icon', {
        margin: 'unset'
      }),
      cM('closable', [
        cE('title', `
          padding-right: unset;
        `)
      ])
    ])
  ])
])
