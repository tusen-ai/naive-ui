import type { GuideTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { popoverDark } from '../../popover/styles'
import { self } from './light'

const guideDark: GuideTheme = {
  name: 'Guide',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Popover: popoverDark
  },
  self
}

export default guideDark
