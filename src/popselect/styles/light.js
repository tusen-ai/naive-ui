import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { commonLight } from '../../_styles/new-common'
import { popoverLight } from '../../popover/styles'

export default {
  name: 'Popselect',
  common: commonLight,
  peers: {
    Popover: popoverLight,
    BaseSelectMenu: baseSelectMenuLight
  }
}
