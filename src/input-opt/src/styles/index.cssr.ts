import { c, cB } from '../../../_utils/cssr'

export default c([
  cB('input-opt', `
    display: flex;
    align-items: center;
    gap: 8px;
    `, [
    cB('input', `
        width: var(--n-width);;
        padding-right: 0;
        padding-left: 0;
        text-align: center;`)
  ])
])
