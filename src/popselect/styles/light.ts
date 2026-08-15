import type { InternalSelectMenuTheme } from '../../_internal/select-menu/styles'
import type { ExtractThemeOverrides, Theme } from '../../_mixins'
import type { ThemeCommonVars } from '../../config-provider'
import type { PopoverTheme } from '../../popover/styles'
import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { createTheme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import { popoverLight } from '../../popover/styles'

export function self(vars: ThemeCommonVars) {
  const { boxShadow2 } = vars
  return {
    menuBoxShadow: boxShadow2
  }
}

export interface PopselectThemeVars extends ReturnType<typeof self> {}

const popselectLight: PopselectTheme = createTheme({
  name: 'Popselect',
  common: commonLight,
  peers: {
    Popover: popoverLight,
    InternalSelectMenu: internalSelectMenuLight
  },
  self
})

export interface PopselectTheme extends Theme<
  'Popselect',
  PopselectThemeVars,
  {
    Popover: PopoverTheme
    InternalSelectMenu: InternalSelectMenuTheme
  }
> {}

export interface PopselectThemeOverrides extends ExtractThemeOverrides<PopselectTheme> {}

export default popselectLight
