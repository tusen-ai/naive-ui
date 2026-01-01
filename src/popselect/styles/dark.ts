import type { PopselectTheme } from './light'
import { internalSelectMenuDark } from '../../_internal/select-menu/styles'
import { commonDark } from '../../_styles/common'
import { popoverDark } from '../../popover/styles'

const popselect: PopselectTheme = {
  name: 'Popselect',
  common: commonDark,
  peers: {
    Popover: popoverDark,
    InternalSelectMenu: internalSelectMenuDark
  }
}

export default popselect
