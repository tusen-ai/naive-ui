import { changeColor } from 'seemly'
import commonVars from './_common'
import { commonDark } from '../../_styles/common'
import type { SwitchTheme } from './light'

const switchDark: SwitchTheme = {
  name: 'Switch',
  common: commonDark,
  self (vars) {
    const {
      primaryColorSuppl,
      opacityDisabled,
      borderRadius,
      primaryColor,
      textColor2,
      baseColor
    } = vars
    const railOverlayColor = 'rgba(255, 255, 255, .20)'
    return {
      ...commonVars,
      iconColor: baseColor,
      textColor: textColor2,
      loadingColor: primaryColorSuppl,
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
      buttonBorderRadiusLarge: borderRadius,
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`
    }
  }
}

export default switchDark
