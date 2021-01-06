import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { popoverDark } from '../../popover/styles'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Popselect',
  common: commonDark,
  peers: {
    Popover: popoverDark,
    BaseSelectMenu: baseSelectMenuDark
  }
}
