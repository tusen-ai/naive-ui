import type { ThemeCommonVars } from '../../config-provider'
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

const popselectLight = createTheme({
  name: 'Popselect',
  common: commonLight,
  peers: {
    Popover: popoverLight,
    InternalSelectMenu: internalSelectMenuLight
  },
  self
})

export interface PopselectThemeVars {}
export default popselectLight
export type PopselectTheme = typeof popselectLight
