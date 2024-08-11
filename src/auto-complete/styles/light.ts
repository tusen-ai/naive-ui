import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { inputLight } from '../../input/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'

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
