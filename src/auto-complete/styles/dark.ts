import { baseSelectMenuDark } from '../../_base/select-menu/styles'
import { inputDark } from '../../input/styles'
import { commonDark } from '../../_styles/new-common'
import type { AutoCompleteTheme } from './light'

const autoCompleteDark: AutoCompleteTheme = {
  name: 'AutoComplete',
  common: commonDark,
  peers: {
    BaseSelectMenu: baseSelectMenuDark,
    Input: inputDark
  }
}

export default autoCompleteDark
