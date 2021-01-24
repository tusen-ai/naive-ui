import { baseSelectMenuLight } from '../../_base/select-menu/styles'
import { commonLight } from '../../_styles/new-common'
import { popoverLight } from '../../popover/styles'
import { createTheme } from '../../_mixins'

const popselectLight = createTheme({
  name: 'Popselect',
  common: commonLight,
  peers: {
    Popover: popoverLight,
    BaseSelectMenu: baseSelectMenuLight
  }
})

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PopselectThemeVars {}
export default popselectLight
export type PopselectTheme = typeof popselectLight
