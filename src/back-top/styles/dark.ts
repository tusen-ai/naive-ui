import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { BackTopTheme } from './light'

const backTopDark: BackTopTheme = {
  name: 'BackTop',
  common: commonDark,
  self (vars) {
    const {
      popoverColor,
      textColor2,
      primaryColorHover,
      primaryColorPressed
    } = vars
    return {
      ...commonVariables,
      color: popoverColor,
      textColor: textColor2,
      iconColor: textColor2,
      iconColorHover: primaryColorHover,
      iconColorPressed: primaryColorPressed,
      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
      boxShadowHover: '0 2px 12px 0px rgba(0, 0, 0, .18)',
      boxShadowPressed: '0 2px 12px 0px rgba(0, 0, 0, .18)'
    }
  }
}

export default backTopDark
