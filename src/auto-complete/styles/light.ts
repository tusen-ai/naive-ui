import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/new-common'
import { createTheme } from '../../_mixins'

const autoCompleteLight = createTheme({
  name: 'AutoComplete',
  common: commonLight,
  peers: {
    BaseSelectMenu: baseSelectMenuLight,
    Input: inputLight
  }
})

export default autoCompleteLight
export type AutoCompleteTheme = typeof autoCompleteLight
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AutoCompleteThemeVars {}
