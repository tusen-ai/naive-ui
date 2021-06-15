import { cB, cM, cE } from '../../../_utils/cssr'

export default cB('tag', [
  cM('rtl', `
    direction: rtl;
  `),
  cE('close', [cM('rtl', `
    margin: var(--close-rtl-margin)
  `)])
])
