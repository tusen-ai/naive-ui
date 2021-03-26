import { internalSelectionLight } from '../../_internal/selection/styles'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'

const selectLight = createTheme({
  name: 'Select',
  common: commonLight,
  peers: {
    InternalSelection: internalSelectionLight,
    InternalSelectMenu: internalSelectMenuLight
  },
  self (vars) {
    const { boxShadow2 } = vars
    return {
      menuBoxShadow: boxShadow2
    }
  }
})

export default selectLight
export type SelectTheme = typeof selectLight
