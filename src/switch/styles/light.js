import create from '../../_styles/utils/create-component-base'

export default create({
  theme: 'light',
  name: 'Switch',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor
    } = derived
    const railOverlayColor = 'rgba(0, 0, 0, .14)'
    return {
      railColor: railOverlayColor,
      railColorActive: primaryColor,
      buttonBoxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
      // Deprecated, need to figure out a method to refactor them
      buttonBackgroundImage: 'linear-gradient(52deg,rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(148,151,155,1) 75%,rgba(148,151,155,1) 100%)',
      buttonBackgroundImageActive: 'linear-gradient(52deg,rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(120,205,104,1) 75%,rgba(20,166,165,1) 100%)',
      buttonBackgroundPosition: '0, 0'
    }
  }
})
