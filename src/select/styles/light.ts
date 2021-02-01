import { internalSelectionLight } from '../../_internal/selection/styles'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { commonLight } from '../../_styles/new-common'
import { createTheme } from '../../_mixins'

const selectLight = createTheme({
  name: 'Select',
  common: commonLight,
  peers: {
    InternalSelection: internalSelectionLight,
    InternalSelectMenu: internalSelectMenuLight
  }
})

export default selectLight
export type SelectTheme = typeof selectLight
