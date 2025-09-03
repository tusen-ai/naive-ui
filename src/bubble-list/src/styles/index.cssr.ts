import { c, cB } from '../../../_utils/cssr'

export default c([
  cB('bubble-list', `
        display: flex;
        flex-direction: column;
        gap: var(--n-gap);
        min-height: 0;
        padding-right: 12px;
    `)
])
