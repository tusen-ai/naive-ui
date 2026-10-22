import type { TabsTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { self } from './light'

const tabsDark: TabsTheme = {
  name: 'Tabs',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self(vars) {
    const commonSelf = self(vars)
    const { inputColor } = vars
    commonSelf.colorSegment = inputColor
    commonSelf.tabColorSegment = inputColor
    return commonSelf
  }
}

export default tabsDark
