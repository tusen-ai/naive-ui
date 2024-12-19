import type { InternalSelectMenuTheme } from './light'
import { commonDark } from '../../../_styles/common'
import { emptyDark } from '../../../empty/styles'
import { scrollbarDark } from '../../scrollbar/styles'
import { self } from './light'

const internalSelectMenuDark: InternalSelectMenuTheme = {
  name: 'InternalSelectMenu',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  self
}

export default internalSelectMenuDark
