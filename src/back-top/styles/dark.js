import commonVariables from './_common.js'
import { commonDark } from '../../_styles/new-common'

export default {
  name: 'BackTop',
  common: commonDark,
  self (vars) {
    const {
      popoverColor,
      textColor2Overlay,
      primaryColorHover,
      primaryColorPressed
    } = vars
    return {
      ...commonVariables,
      color: popoverColor,
      textColor: textColor2Overlay,
      iconColor: textColor2Overlay,
      iconColorHover: primaryColorHover,
      iconColorPressed: primaryColorPressed,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
    }
  }
}
