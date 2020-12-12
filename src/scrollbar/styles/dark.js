import create from '../../_styles/utils/create-component-base'
import { baseDark } from '../../_styles/base'

export default create({
  name: 'Scrollbar',
  theme: 'dark',
  peer: [baseDark],
  getLocalVars (vars) {
    const { scrollbarColorOverlay, scrollbarColorHoverOverlay } = vars
    return {
      color: scrollbarColorOverlay,
      colorHover: scrollbarColorHoverOverlay
    }
  }
})
