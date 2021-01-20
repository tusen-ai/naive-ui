import { baseSelectionDark } from '../../_base/selection/styles'
import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { commonDark } from '../../_styles/new-common'
import type { SelectTheme } from './light'

const selectDark: SelectTheme = {
  name: 'Select',
  common: commonDark,
  peers: {
    BaseSelection: baseSelectionDark,
    BaseSelectMenu: baseSelectMenuDark
  }
}

export default selectDark
