import { internalSelectMenuLight } from '../../_internal/select-menu/styles'
import { commonLight } from '../../_styles/common'
import { popoverLight } from '../../popover/styles'
import { createTheme } from '../../_mixins'

const popselectLight = createTheme({
  name: 'Popselect',
  common: commonLight,
  peers: {
    Popover: popoverLight,
    InternalSelectMenu: internalSelectMenuLight
  }
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PopselectThemeVars {}
export default popselectLight
export type PopselectTheme = typeof popselectLight
