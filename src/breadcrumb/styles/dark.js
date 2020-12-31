import commonVariables from './_common'
import { commonDark } from '../../_styles/new-common'

export default {
  common: commonDark,
  self (vars) {
    return {
      ...commonVariables,
      fontSize: vars.fontSize,
      itemTextColor: vars.textColor3Overlay,
      itemTextColorHover: vars.primaryColorHover,
      itemTextColorPressed: vars.primaryColorPressed,
      itemTextColorActive: vars.textColor2Overlay,
      separatorColor: vars.textColor3Overlay
    }
  }
}
