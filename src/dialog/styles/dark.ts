import type { DialogTheme } from './light'
import { commonDark } from '../../_styles/common'
import { buttonDark } from '../../button/styles'
import { self } from './light'

const dialogDark: DialogTheme = {
  name: 'Dialog',
  common: commonDark,
  peers: {
    Button: buttonDark
  },
  self
}

export default dialogDark
