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

const selectLight = createTheme({
  name: 'Select',
  common: commonLight,
  peers: {
    InternalSelection: internalSelectionLight,
    InternalSelectMenu: internalSelectMenuLight
  },
  self
})

export default selectLight
export type SelectThemeVars = ReturnType<typeof self>
export type SelectTheme = typeof selectLight
