import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Scrollbar',
  common: commonLight,
  self (vars) {
    const { scrollbarColorOverlay, scrollbarColorHoverOverlay } = vars
    return {
      color: scrollbarColorOverlay,
      colorHover: scrollbarColorHoverOverlay
    }
  }
}
