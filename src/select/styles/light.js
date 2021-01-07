import { baseSelectionLight } from '../../_base/selection/styles'
import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Select',
  common: commonLight,
  peers: {
    BaseSelection: baseSelectionLight,
    BaseSelectMenu: baseSelectMenuLight
  }
}
