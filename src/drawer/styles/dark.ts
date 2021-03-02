import { commonDark } from '../../_styles/common'
import { scrollbarDark } from '../../scrollbar/styles'
import type { DrawerTheme } from './light'

const drawerDark: DrawerTheme = {
  name: 'Drawer',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
    const { modalColor, textColor2, boxShadow3, lineHeight } = vars
    return {
      color: modalColor,
      textColor: textColor2,
      boxShadow: boxShadow3,
      lineHeight
    }
  }
}

export default drawerDark
