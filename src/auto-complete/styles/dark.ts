import { internalSelectMenuDark } from '../../_internal/select-menu/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/new-common'
import type { AutoCompleteTheme } from './light'

const autoCompleteDark: AutoCompleteTheme = {
  name: 'AutoComplete',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  }
}

export default autoCompleteDark
