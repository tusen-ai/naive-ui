import create from '../../_styles/utils/create-component-base'
import { baseLight } from '../../_styles/base'

export default create({
  name: 'Scrollbar',
  theme: 'light',
  peer: [
    baseLight
  ],
  getLocalVars (vars) {
    const {
      scrollbarColorOverlay,
      scrollbarColorHoverOverlay
    } = vars
    return {
      color: scrollbarColorOverlay,
      colorHover: scrollbarColorHoverOverlay
    }
  }
})
