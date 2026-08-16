import type { InternalSelectMenuTheme } from '../../_internal/select-menu/styles'
import type { InternalSelectionTheme } from '../../_internal/selection/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../_styles/common'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { internalSelectionLight } from '../../_internal/selection/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'

export function self(vars: ThemeCommonVars) {
  const { boxShadow2 } = vars
  return {
    menuBoxShadow: boxShadow2
  }
}

const selectLight: SelectTheme = createTheme({
  name: 'Select',
  common: commonLight,
  peers: {
    InternalSelection: internalSelectionLight,
    InternalSelectMenu: internalSelectMenuLight
  },
  self
})

export interface SelectTheme extends Theme<
  'Select',
  SelectThemeVars,
  {
    InternalSelection: InternalSelectionTheme
    InternalSelectMenu: InternalSelectMenuTheme
  }
> {}

export interface SelectThemeOverrides extends ExtractThemeOverrides<SelectTheme> {}

export default selectLight
export interface SelectThemeVars extends ReturnType<typeof self> {}
