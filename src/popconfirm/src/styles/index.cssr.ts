import { c, cB, cE } from '../../../_utils/cssr'

// vars:
// --font-size
// --icon-size
// --bezier
// --icon-color
export default cB('popconfirm', [
  cE('body', `
    font-size: var(--font-size);
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
  `, [
    cE('icon', `
      display: flex;
      font-size: var(--icon-size);
      color: var(--icon-color);
      transition: color .3s var(--bezier);
      margin: 0 8px 0 0;
    `)
  ]),
  cE('action', `
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
  `, [
    cB('button', [
      c('&:not(:last-child)', {
        marginRight: '8px'
      })
    ])
  ])
])
