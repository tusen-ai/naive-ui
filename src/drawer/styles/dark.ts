import { commonDark } from '../../_styles/new-common'
import { scrollbarDark } from '../../scrollbar/styles'
import type { DrawerTheme } from './light'

const drawerDark: DrawerTheme = {
  name: 'Drawer',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
    const { modalColor, textColor2Overlay, boxShadow3, lineHeight } = vars
    return {
      color: modalColor,
      textColor: textColor2Overlay,
      boxShadow: boxShadow3,
      lineHeight
    }
  }
}

export default drawerDark
