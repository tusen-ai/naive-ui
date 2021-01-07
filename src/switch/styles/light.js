import commonVars from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Switch',
  common: commonLight,
  self (vars) {
    const { primaryColor, opacityDisabled, borderRadius } = vars
    const railOverlayColor = 'rgba(0, 0, 0, .14)'
    return {
      ...commonVars,
      opacityDisabled,
      railColor: railOverlayColor,
      railColorActive: primaryColor,
      buttonBoxShadow:
        '0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)',
      buttonColor: '#FFF',
      railBorderRadiusSmall: borderRadius,
      railBorderRadiusMedium: borderRadius,
      railBorderRadiusLarge: borderRadius,
      buttonBorderRadiusSmall: borderRadius,
      buttonBorderRadiusMedium: borderRadius,
      buttonBorderRadiusLarge: borderRadius
    }
  }
}
