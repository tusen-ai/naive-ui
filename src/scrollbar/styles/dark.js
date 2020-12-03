import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Scrollbar',
  theme: 'dark',
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
