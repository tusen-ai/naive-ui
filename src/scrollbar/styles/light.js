import create from '../../_styles/utils/create-component-base'

export default create({
  name: 'Scrollbar',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      scrollbarColorOverlay,
      scrollbarColorHoverOverlay
    } = derived
    return {
      color: scrollbarColorOverlay,
      colorHover: scrollbarColorHoverOverlay
    }
  }
})
