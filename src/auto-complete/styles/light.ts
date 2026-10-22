import type { InternalSelectMenuTheme } from '../../_internal/select-menu/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import type { InputTheme } from '../../input/styles'
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

const autoCompleteLight: AutoCompleteTheme = createTheme({
  name: 'AutoComplete',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    Input: inputLight
  },
  self
})

export interface AutoCompleteTheme extends Theme<
  'AutoComplete',
  AutoCompleteThemeVars,
  {
    InternalSelectMenu: InternalSelectMenuTheme
    Input: InputTheme
  }
> {}

export interface AutoCompleteThemeOverrides extends ExtractThemeOverrides<AutoCompleteTheme> {}

export default autoCompleteLight
export interface AutoCompleteThemeVars extends ReturnType<typeof self> {}
