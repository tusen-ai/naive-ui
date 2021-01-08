import commonVariables from './_common'
import { commonLight } from '../../_styles/new-common'

export default {
  name: 'Breadcrumb',
  common: commonLight,
  self (vars) {
    const {
      fontSize,
      textColor3,
      primaryColorHover,
      primaryColorPressed,
      textColor2
    } = vars
    return {
      ...commonVariables,
      fontSize: fontSize,
      itemTextColor: textColor3,
      itemTextColorHover: primaryColorHover,
      itemTextColorPressed: primaryColorPressed,
      itemTextColorActive: textColor2,
      separatorColor: textColor3
    }
  }
}
