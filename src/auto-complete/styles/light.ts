import type { ThemeCommonVars } from '../../_styles/common'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { inputLight } from '../../input/styles'

export function self(vars: ThemeCommonVars) {
  const { boxShadow2 } = vars
  return {
    menuBoxShadow: boxShadow2
  }
}

const autoCompleteLight = createTheme({
  name: 'AutoComplete',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    Input: inputLight
  },
  self
})

export default autoCompleteLight
export type AutoCompleteTheme = typeof autoCompleteLight
export type AutoCompleteThemeVars = ReturnType<typeof self>
