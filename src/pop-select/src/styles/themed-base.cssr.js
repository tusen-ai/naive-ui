import { cTB, c, cB } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    return cTB('popselect', [
      cB('base-select-menu', {
        raw: `
          box-shadow: none !important;
      `
      })
    ])
  }
])
