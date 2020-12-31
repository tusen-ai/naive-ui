import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  common: commonLight,
  self (vars) {
    return {
      ...commonVariables,
      fontSize: vars.fontSize,
      itemTextColor: vars.textColor3,
      itemTextColorHover: vars.primaryColorHover,
      itemTextColorPressed: vars.primaryColorPressed,
      itemTextColorActive: vars.textColor2,
      separatorColor: vars.textColor3
    }
  }
}
