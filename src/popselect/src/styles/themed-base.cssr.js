import { c, cB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    return cB('popselect', [
      cB('base-select-menu', {
        raw: `
          box-shadow: none !important;
        `
      })
    ])
  }
])
