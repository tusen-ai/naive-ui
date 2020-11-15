import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'

export default create({
  theme: 'light',
  name: 'Switch',
  getDerivedVariables ({ base, derived }) {
    const {
      primaryColor
    } = derived
    const railOverlayColor = 'rgba(0, 0, 0, .14)'
    return {
      ...commonVars,
      railColor: railOverlayColor,
      railColorActive: primaryColor,
      buttonBoxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
      buttonColor: '#FFF'
    }
  }
})
