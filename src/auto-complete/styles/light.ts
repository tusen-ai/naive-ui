import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/common'
import { createTheme } from '../../_mixins'

const autoCompleteLight = createTheme({
  name: 'AutoComplete',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    Input: inputLight
  }
})

export default autoCompleteLight
export type AutoCompleteTheme = typeof autoCompleteLight
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AutoCompleteThemeVars {}
