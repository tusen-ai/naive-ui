import { commonDark } from '../../_styles/common'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { self } from './light'
import type { DrawerTheme } from './light'

const drawerDark: DrawerTheme = {
  name: 'Drawer',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self
}

export default drawerDark
