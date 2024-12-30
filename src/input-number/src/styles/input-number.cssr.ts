import { cB } from '../../../_utils/cssr'

export default cB('input-number', `
  display: inline-flex;
  `, [
  cB('input-number-suffix', `
    display: inline-block;
    margin-right: 10px;
  `),
  cB('input-number-prefix', `
    display: inline-block;
    margin-left: 10px;
  `)
])
