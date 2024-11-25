import type { AutoCompleteTheme } from './light'
import { internalSelectMenuDark } from '../../_internal/select-menu/styles'
import { commonDark } from '../../_styles/common'
import { inputDark } from '../../input/styles'
import { self } from './light'

const autoCompleteDark: AutoCompleteTheme = {
  name: 'AutoComplete',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  },
  self
}

export default autoCompleteDark
