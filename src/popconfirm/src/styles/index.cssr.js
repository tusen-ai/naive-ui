import { c, cB, cE, cM } from '../../../_utils/cssr'

// vars:
// --font-size
// --icon-size
// --bezier
// --icon-color
export default cB('popconfirm-content', {
  padding: '4px 0'
}, [
  cE('body', `
    font-size: var(--font-size);
    white-space: nowrap;
    position: relative;
  `, [
    cB('icon', `
      position: absolute;
      font-size: var(--icon-size);
      left: 0;
      top: -2px;
      transition: color .3s var(--bezier);
      color: var(--icon-color);
    `)
  ]),
  cM('show-icon', [
    cE('body', {
      paddingLeft: '26px'
    })
  ]),
  cE('action', `
    margin-top: 14px;
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
