import create from '../../styles/_utils/create-component-base'

export default create({
  name: 'Scrollbar',
  theme: 'light',
  getDerivedVariables ({ base, derived }) {
    const {
      scrollbarBackgroundOverlayColor,
      scrollbarHoverBackgroundOverlayColor
    } = derived
    return {
      color: scrollbarBackgroundOverlayColor,
      colorHover: scrollbarHoverBackgroundOverlayColor
    }
  }
})
