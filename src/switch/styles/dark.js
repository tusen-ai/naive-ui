import commonVars from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'Switch',
  common: commonDark,
  self (vars) {
    const { primaryColorSuppl, opacityDisabled, borderRadius } = vars
    const railOverlayColor = 'rgba(255, 255, 255, .20)'
    return {
      ...commonVars,
      opacityDisabled,
      railColor: railOverlayColor,
      railColorActive: primaryColorSuppl,
      buttonBoxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.4)',
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
