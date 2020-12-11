import create from '../../_styles/utils/create-component-base'
import commonVars from './_common'
import { baseLight } from '../../_styles/base'

export default create({
  theme: 'light',
  name: 'Switch',
  peer: [
    baseLight
  ],
  getLocalVars (vars) {
    const {
      primaryColor
    } = vars
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
