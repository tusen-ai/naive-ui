import { cB, cM, cE, c } from '../../../_utils/cssr'

export default cB('button', [
  cM('rtl', `
    direction: rtl;
  `, [
    cE('icon', {
      margin: 'var(--icon-margin)',
      marginRight: 0
    }),
    cE('content', [
      c('~', [
        cE('icon', {
          margin: 'var(--icon-margin)',
          marginLeft: 0
        })
      ])
    ])
  ])
])
