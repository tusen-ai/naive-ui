import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Scrollbar',
  theme: 'dark',
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
