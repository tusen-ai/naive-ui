import type { PopoverTheme } from './light'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { commonDark } from '../../_styles/common'
import { self } from './light'

const popoverDark: PopoverTheme = {
  name: 'Popover',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self
}

export default popoverDark
