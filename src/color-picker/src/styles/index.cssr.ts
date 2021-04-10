import { c, cB, cE } from '../../../_utils/cssr'

export default c([
  cB('color-input', `
    display: flex;
  `, [
    cE('unit', `
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    `)
  ])
])
