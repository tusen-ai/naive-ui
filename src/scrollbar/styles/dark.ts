import { commonDark } from '../../_styles/common'
import type { ScrollbarTheme } from './light'

const scrollbarDark: ScrollbarTheme = {
  name: 'Scrollbar',
  common: commonDark,
  self (vars) {
    const { scrollbarColorOverlay, scrollbarColorHoverOverlay } = vars
    return {
      color: scrollbarColorOverlay,
      colorHover: scrollbarColorHoverOverlay
    }
  }
}

export default scrollbarDark
