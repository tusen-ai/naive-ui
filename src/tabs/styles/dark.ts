import { commonDark } from '../../_styles/common'
import type { TabsTheme } from './light'
import { self } from './light'

const tabsDark: TabsTheme = {
  name: 'Tabs',
  common: commonDark,
  self (vars) {
    const commonSelf = self(vars)
    commonSelf.tabBorderColorActive = '#0000'
    return commonSelf
  }
}

export default tabsDark
