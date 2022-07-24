import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('tree', [
  cM('rtl', `
    direction: rtl;
    text-align: right;
  `, [
    cB('tree-node-switcher', `
      transform: rotate(180deg);
    `, [
      cM('expanded', `
        transform: rotate(90deg);
      `)
    ]),
    cB('tree-node-checkbox', `
      margin-right: 0;
      margin-left: 4px;
    `),
    cB('tree-node-content', [
      cE('prefix', `
        margin-right: 0;
        margin-left: 8px;
      `)
    ]),
    cB('tree-node-checkbox', [
      cM('right', `
        margin-right: 4px;
      `)
    ])
  ])
])
