import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { popoverDark } from '../../popover/styles'
import { commonDark } from '../../_styles/new-common'
import type { PopselectTheme } from './light'

const popselect: PopselectTheme = {
  name: 'Popselect',
  common: commonDark,
  peers: {
    Popover: popoverDark,
    BaseSelectMenu: baseSelectMenuDark
  }
}

export default popselect
