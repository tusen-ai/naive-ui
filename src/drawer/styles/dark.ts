import type { DrawerTheme } from './light'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { self } from './light'

const drawerDark: DrawerTheme = {
  name: 'Drawer',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self
}

export default drawerDark
