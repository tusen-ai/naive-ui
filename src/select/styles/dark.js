import { baseSelectionDark } from '../../_base/selection/styles'
import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Select',
  common: commonDark,
  peers: {
    BaseSelection: baseSelectionDark,
    BaseSelectMenu: baseSelectMenuDark
  }
}
