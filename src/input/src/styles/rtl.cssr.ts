import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('input', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('prefix', {
      marginRight: 0,
      marginLeft: '4px'
    }),
    cE('suffix', {
      marginRight: '4px',
      marginLeft: 0
    }),
    cM('textarea', 'width: 100%;', [
      cB('input-word-count', `
      left: var(--n-padding-right);
      right: unset;
    `)
    ]),
    cB('input-word-count', `
      margin-left: 0;
      margin-right: 4px;
    `)
  ])
])
