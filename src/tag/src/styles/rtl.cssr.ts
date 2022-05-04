import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('tag', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('close', `
      margin: var(--n-close-margin-rtl);
    `),
    cE('avatar', `
      margin-left: 6px;
      margin-right: 0;
    `),
    cM('round', [
      cE('avatar', {
        marginLeft: '6px',
        marginRight: '-5px'
      })
    ])
  ])
])
