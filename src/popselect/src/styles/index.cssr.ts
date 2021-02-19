import { c, cB } from '../../../_utils/cssr'

export default c([
  cB('popselect', [
    cB('base-select-menu', `
      box-shadow: none !important;
    `)
  ]),
  c('[v-overlap]', [
    cB('popselect', [
      cB('base-select-menu', `
        margin: 0;
      `)
    ])
  ])
])
