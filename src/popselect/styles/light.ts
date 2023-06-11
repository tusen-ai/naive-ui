import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { type ThemeCommonVars } from '../../config-provider'
import { commonLight } from '../../_styles/common'
import { popoverLight } from '../../popover/styles'
import { createTheme } from '../../_mixins'

export function self (vars: ThemeCommonVars) {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PopselectThemeVars {}
export default popselectLight
export type PopselectTheme = typeof popselectLight
