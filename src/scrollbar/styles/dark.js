import { commonDark } from '../../_styles/new-common'

export default {
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
