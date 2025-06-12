import { c, cB, cM, cNotM } from '../../../_utils/cssr'

// --n-input-width
// --n-gap
export default c([
  cB('input-otp', `
    display: flex;
    align-items: center;
    gap: var(--n-gap);
  `, [
    cB('input', ``, [
      cNotM('autosize', `
        width: var(--n-input-width);
        text-align: center;
      `),
      cM('autosize', `
        width: var(--n-input-width);
        text-align: center;
      `)
    ])
  ])
])
