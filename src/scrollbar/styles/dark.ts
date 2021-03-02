import { commonDark } from '../../_styles/common'
import type { ScrollbarTheme } from './light'

const scrollbarDark: ScrollbarTheme = {
  name: 'Scrollbar',
  common: commonDark,
  self (vars) {
    const { scrollbarColor, scrollbarColorHover } = vars
    return {
      color: scrollbarColor,
      colorHover: scrollbarColorHover
    }
  }
}

export default scrollbarDark
