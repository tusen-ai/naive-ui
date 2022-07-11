import { cB, cE, cM } from '../../../_utils/cssr'

export default cB('message', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('icon', {
      // reverse margin: var(--n-icon-margin);
      marginLeft: '10px',
      marginRight: '0'
    }),
    cE('close', {
      // reverse margin: var(--n-close-margin);
      marginLeft: '0',
      marginRight: '10px'
    })
  ])
])
