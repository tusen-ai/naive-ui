import { commonDark } from '../../_styles/common'
import { scrollbarDark } from '../../scrollbar/styles'
import type { LayoutTheme } from './light'
import { self } from './light'

const layoutDark: LayoutTheme = {
  name: 'Layout',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
    const commonSelf = self(vars)
    commonSelf.siderToggleButtonColor = 'rgba(255, 255, 255, .3)'
    return commonSelf
  }
}

export default layoutDark
