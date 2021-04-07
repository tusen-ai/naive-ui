import { cB, cNotM, cM } from '../../../_utils/cssr'

export default cB('ellpisis', {
  overflow: 'hidden'
}, [
  cNotM('line-clamp', `
    white-space: nowrap;
    display: inline-block;
    vertical-align: bottom;
    max-width: 100%;
  `),
  cM('line-clamp', `
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
  `)
])
