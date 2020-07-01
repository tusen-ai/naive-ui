import { cB, c } from '../../../../_utils/cssr/index.js'

export default c([
  () => cB('base-wave', {
    raw: `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: inherit;
    `
  })
])
