import type { PopconfirmTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { popoverDark } from '../../popover/styles'
import { self } from './light'

const popconfirmDark: PopconfirmTheme = {
  name: 'Popconfirm',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Popover: popoverDark
  },
  self
}

export default popconfirmDark
