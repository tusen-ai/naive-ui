import { cB, cM, cE, c } from '../../../_utils/cssr'

export default cB('button', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('icon', {
      margin: 'var(--n-icon-margin)',
      marginRight: 0
    }),
    cE('content', [
      c('~', [
        cE('icon', {
          margin: 'var(--n-icon-margin)',
          marginLeft: 0
        })
      ])
    ])
  ])
])
