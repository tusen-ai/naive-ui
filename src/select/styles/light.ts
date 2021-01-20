import { baseSelectionLight } from '../../_base/selection/styles'
import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { commonLight } from '../../_styles/new-common'
import { createTheme } from '../../_mixins'

const selectLight = createTheme({
  name: 'Select',
  common: commonLight,
  peers: {
    BaseSelection: baseSelectionLight,
    BaseSelectMenu: baseSelectMenuLight
  }
})

export default selectLight
export type SelectTheme = typeof selectLight
